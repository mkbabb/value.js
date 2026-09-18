# M-13 · The Layout Gestalt — worker-O (Opus, design seat)

**MODEL RECEIPT.** `claude-opus-5[1m]` — Opus 5, 1M context. Declared seat, not inherited. This seat
executed the M-13 brief solo and blind to worker-F (L-14 tri-fold).

**Band.** DESIGN. Zero source edits made. Everything below `docs/tranches/V/megatranche/design/` plus
one throwaway probe in scratch.

---

## 0. What this seat measured (L-9/L-10: nothing here is inherited unmeasured)

One probe, WebKit, dev server `http://localhost:9000`, 4 viewports × 2 routes, geometry only:

```
node docs/tranches/V/megatranche/design/layout-gestalt-geo-probe.mjs
```
(committed alongside this document so every number below is re-runnable — L-9.)

```
vp    route   layout   pane-container   wCov   pcH/scene  --content-max-h              gridCols       cfg      text  docScroll
390   #/      mobile   358 x 591.9      91.8%  80.9%      100%                         358px          false/0  69    0
390   #/blob  mobile   358 x 591.9      91.8%  80.9%      100%                         358px          false/0  68    0
1440  #/      desktop  1042 x 774       72.4%  96.3%      clamp(34rem,86dvh,52rem)     512px 512px    false/0  893   0
1440  #/blob  desktop  1042 x 774       72.4%  96.3%      clamp(34rem,86dvh,52rem)     512px 512px    true/31  748   0
2560  #/      desktop  1049.9 x 832     41.0%  62.0%      clamp(34rem,86dvh,52rem)     512px 512px    false/0  893   0
3440  #/      desktop  1049.9 x 608     30.5%  45.4%      clamp(30rem,62dvh,38rem)     512px 512px    false/0  893   0
3440  #/blob  desktop  1049.9 x 608     30.5%  45.4%      clamp(30rem,62dvh,38rem)     512px 512px    true/31  748   0
```

**Four facts MT-F028 did not have, and one number of its I could not reproduce.**

1. **The ultrawide cap is two-axis, not one.** At 3440×1440 the aspect crosses `21/9` (2.389 > 2.333),
   firing `foundation.css:479` → `--content-max-h: clamp(30rem, 62dvh, 38rem)` = **608px**. The stage is
   therefore **30.5% of viewport width AND 45.4% of the scene band's height** — about **86% of the
   viewport area is dead**. MT-F028 reported the inline axis only.

2. **`documentElement.scrollHeight - clientHeight === 0` at every viewport, including 390×844.**
   `shell.css:23,26` sets `height: 100dvh; overflow: hidden`. The mobile page **cannot scroll**. This —
   not the pane router alone — is the mechanism behind "mobile shows ~8% of desktop content": content
   that does not fit the first screen is either amputated or trapped in an unlabelled inner scroller
   (cf. the zoom-200 row: `channelRail bottom 645.67` against `vh=450`, `docScrollable=0`).

3. **The 50/50 grid is width-invariant.** `gridTemplateColumns` is `512px 512px` at 1440, 2560 **and**
   3440 — `--pane-max` (32rem) is a constant, so every pixel above ~1050 is gutter by construction.

4. **`svh` count = 0.** All 8 viewport-relative block units in `demo/` are `dvh`, including the shell's
   `height: 100dvh`. On iOS Safari that means the shell re-lays-out as the URL bar collapses.

5. **Honest divergence.** MT-F028's "content-width coverage 65% @3440" is a *union-of-content* measure;
   my 30.5% is the `.pane-container` (the actual stage) measure. I could not reproduce the union figure
   reliably — my own union metric returns 248–592% on `#/` because the Picker's corner-breaking HeroBlob
   ornament and an off-viewport node inflate the bounding box. **I discard my union numbers and use
   `.pane-container`.** Both instruments say the same thing; only the pane-container one is re-runnable.

### The mechanism census, scoped to source (L-9)

MT-F028's "34 @media" is the total; **only 7 are viewport-dimension queries**. The other 27 are
*capability* queries (`prefers-reduced-motion` ×9, `forced-colors` ×2, `prefers-contrast`,
`prefers-reduced-transparency`, `print`, `pointer: coarse` ×3, `hover: hover`) and this design does not
touch them — they are correct and must survive.

```
MECHANISM A — viewport @media                            7 rules / 6 files
  styles/foundation.css:471   (min-width:1024px) and (min-aspect-ratio:1.1)   → 3 tokens
  styles/foundation.css:479   (min-aspect-ratio: 21/9)                        → --content-max-h
  styles/shell.css:129        (min-width:1024px) and (min-aspect-ratio:1.1)   → the dual grid
  styles/animations.css:17    (max-width: 639px)
  shell/PaneSegmentedControl.vue:46  (max-width: 639px)
  shell/dock/DockStatusLamp.vue:70   (min-width: 1024px)
  picker/…/ConsoleRail.vue:323       (max-width: 1023px)                      → the 44px touch rung
MECHANISM B — Tailwind responsive prefixes              58 occurrences / 19 .vue files
MECHANISM C — JS breakpoint fork                        37 refs / 13 files
                (useBreakpoint · isDesktop · isMobile · mobilePaneIndex)
                                                        ───────────────────────
                                                        102 adaptation sites
                                                        expressing 2 thresholds
                                                        in 3 incompatible dialects
CONTAINMENT   container-type 1 (shell.css:83) · @container 0 · cqi/cqw 18
```

---

## 1. The decisive fact: the one mechanism already ships

`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/styles.css` — **glass-ui 7.0.0,
already installed, zero demo consumers** (`grep -c InstrumentChassis demo/` → **0**):

```css
.instrument-chassis {
  --instrument-dial-padding-inline: clamp(1rem, 3cqi, 1.5rem);   /* cq-driven spacing */
  --instrument-dial-gap:            clamp(1rem, 3cqi, 1.5rem);
  --instrument-title-gap: calc(var(--instrument-dial-padding-inline,1.5rem) / 2.618);
  container-type: inline-size;                                    /* IT IS THE CONTAINER */
}
.instrument-composition { display: grid; grid-template-columns: minmax(0,1fr); … }
[data-proportion="golden"]            [data-has-inspector] { grid-template-columns: minmax(0,61.8033989fr) minmax(0,38.1966011fr); }
[data-proportion="preview-dominant"]  [data-has-inspector] { grid-template-columns: minmax(0,66.6666667fr) minmax(0,33.3333333fr); }
@container (max-width: 44.9375rem) {                            /* COLLAPSE ON CONTAINER */
  [data-proportion] [data-has-inspector] { grid-template-columns: minmax(0,1fr); }
}
```

Four properties this hands us for free, each of which the demo currently hand-rolls wrong:

| Property | Producer (shipping) | Demo (today) |
|---|---|---|
| adaptation trigger | `@container (max-width: 44.9375rem)` on its own box | 3 viewport dialects, 102 sites |
| proportion | exact `golden` / `preview-dominant`, **unbounded `fr`** | `512px 512px` = 50/50, hard-capped |
| spacing | `cqi` clamps, six named S122 tokens | `--pane-gap` + 58 Tailwind prefixes |
| collapse order | stage → inspector → action, one column | `v-if` remount of a different subtree |

**Therefore this design is overwhelmingly a deletion.** The owner's "fewer mechanisms and fewer lines"
is not a stretch goal here — it is what adopting the already-paid-for producer contract *does*.

`OPTICAL-BENCH-COMPOSITIONS.md:106` already binds this: *"glass-ui owns named regions/phases/material,
exact golden/preview-dominant proportions, inspector-absent expansion and stage→inspector→action narrow
collapse. Regions are landmark-neutral; **value owns the route main and adds no grid CSS**."* Verified
by reading, not by a challenger's quotation; both canon files are tracked (`git cat-file -e` passes).

**Corollary the collapse threshold changes, and for the better.** 44.9375rem = 719px *of container*.
With a fluid gutter the container is ≈ viewport − 2×gutter, so the split collapses at ≈750px viewport,
not 1024px. A 900px window — today shoved into the single-pane mobile grammar — gets the golden split
it can plainly afford.

---

## 2. THE MECHANISM LAW

> **ML-0 — One adaptation mechanism: the region's own box.**
> Every layout decision in `demo/` is a function of the *containing box* the decision affects, never of
> the viewport. The viewport is consulted for exactly two things, both block-axis reservations:
> `100svh` on the shell and `40svh` on the persistent-stage ceiling (§4). Nothing else reads `vw`,
> `vh`, `lvh`, a `min-width`/`max-width` media query, a `sm:`/`md:`/`lg:` prefix, or a JS breakpoint.

**ML-1 — `container-type: inline-size`, and `size` is refused.**
The scene band declares `container: scene / inline-size`. `size` is *rejected* — it applies
`contain: size`, which makes the box's height independent of its content, which structurally forbids
the narrow document-scrolling sequence `VISUAL-CONSTITUTION.md:32` (§3 law 6) requires. Consequence:
`cqb`/`cqh` are unavailable and the block axis is governed by `svh`/`dvh` + grid (§4). *This is a
facility refused for what it would break — recorded so a later wave does not "improve" it back in.*

**ML-2 — The block axis is `svh` for reservations, `dvh` for fills, `lvh` never.**
`svh` (small viewport) is the honest first-paint floor: a `100dvh` shell is taller than the visible area
while browser chrome is shown, so the first frame is already clipped and then *reflows* when the bar
collapses. `min-block-size: 100svh` on `.app-layout` reserves the guaranteed-visible box and lets the
document grow past it. `dvh` stays only where an element must track the live viewport (`40dvh` media
ceilings). `100vh` remains 0 and `lvh` is never introduced.

**ML-3 — `@media` survives only for *capability*, never for *size*.**
`prefers-*`, `forced-colors`, `print`, `pointer`, `hover` are kept as-is (27 rules). Two of the seven
size queries are capability questions wearing a width: `ConsoleRail.vue:323 (max-width:1023px)` grows
touch targets — that is `(pointer: coarse)`, and stating it correctly also fixes touch laptops, which
the width query gets wrong today. `DockStatusLamp.vue:70 (min-width:1024px)` folds a label when the
*dock* is narrow — that is `@container dock (min-width: 30rem)`, and glass-ui **already ships those
rules**; the demo simply never passed `container-name="dock"` to `<Dock>`, so two producer rules are
dead code in this app right now (verified: `grep -c containerName demo/shell/dock/` → 0, while
`dock/styles/density.css` carries `@container dock (max-width:29.9375rem)` and
`(min-width:30rem) and (max-width:44.9375rem)`).

**ML-4 — Intrinsic sizing before any query.**
A query is the *last* resort. Before writing one, the answer must be shown impossible with
`minmax()`, `clamp()`, `auto-fit`/`auto-fill`, `aspect-ratio`, `fr`, `min()`/`max()`. Every "column
count" in this design is `repeat(auto-fill, minmax(<intrinsic>, 1fr))` — it needs no breakpoint, works
at 320 and 3440 from one declaration, and stops adding tracks when the content runs out.

**ML-5 — `:has()` replaces the JS layout question.**
The shell's `currentConfig.right !== null && 'pane-container--dual'` computation and the
`[data-layout]` stamp both die: the producer already keys on `[data-has-inspector]`, and where the
demo needs the same question it asks `main.scene:has(.instrument-inspector)`. No JS decides geometry.

**ML-6 — Logical properties throughout; one honest caveat.**
`inline-size`/`block-size`/`inset-block-start`/`padding-inline` per `VISUAL-CONSTITUTION.md:151`
("chrome, navigation and layout follows the document"). **Unknown, flagged:** `overflow-block` /
`overscroll-behavior-block` are the logical spellings and I could **not** verify support — the repo
declares no `browserslist` and no Vite `target`. W-L1 resolves this with one `CSS.supports` probe; if
it fails, the shipped form is `overflow-y`/`overscroll-behavior-y` with the logical form banked
(re-trigger written in §8).

### What ML-0..6 delete

| Deleted | Count | Replaced by |
|---|---|---|
| viewport `@media` rules | 7 → **0** | container queries (2) · capability queries (2) · intrinsic sizing (3) |
| Tailwind `sm:`/`md:`/`lg:` prefixes in `demo/**.vue` | 58 → **0** | region CSS on the chassis' own container |
| JS layout breakpoint refs (`useBreakpoint`/`isDesktop`/`isMobile`/`mobilePaneIndex`) | 37 → **0** | `[data-has-inspector]` + `:has()` |
| tokens `--pane-max` `--pane-min` `--pane-gap` `--content-max-h` (+17 consumers) | 4 → **0** | producer S122 tuple + `--app-gutter` |
| `demo/shell/PaneSegmentedControl.vue` | 52 LoC → **0** | retired by canon `:89`, `:32` |
| `.pane-container(--dual)` `.pane-wrapper--left/--right/--ghost` `[data-layout]` | shell.css 98–139 | `.instrument-composition` |
| `grid-template-columns` declarations in `demo/styles/` | 2 → **0** | producer-owned |
| net | **≥ 102 adaptation sites → 1 mechanism** | |

---

## 3. THE ULTRAWIDE LAW (> 2000px)

The RED input is a *decision-shaped hole*: 30.5% × 45.4% at 3440 is not a design choice, it is
`--pane-max: 32rem` (a 2026-07-05 card-width ruling about **card comfort**) leaking upward into a
**page** cap it was never asked to decide, plus a `21/9` arm invented to stop two cards going absurdly
tall. Neither is a statement about ultrawide screens. So:

> **UL-1 — No route's stage is bounded by a viewport-independent constant.** `--pane-max`,
> `--content-max-h` and the `21/9` arm are deleted outright. The scene band's own grid row is the
> block cap (which `foundation.css:427`'s own comment already asserts: *"The scene band's own height
> IS the honest cap"*).

> **UL-2 — Surplus is spent, in this order, and only the last resort is margin.**
> 1. **The protagonist grows.** Stages are `fr` with an `aspect-ratio`; a 2080px meniscus at 3440 is
>    strictly better than a 512px one — a colour field's job is precision, and precision is pixels.
> 2. **Fields gain columns.** Every repeating region — Browse/Library slips, the Mix operand rack,
>    Generate's dots, the Blob/Atmosphere row banks, the Picker channel rail — is
>    `repeat(auto-fill, minmax(<slip>, 1fr))`. Surplus becomes *density*, and `auto-fill` stops
>    minting tracks when the content runs out, so it degrades to (1) automatically.
> 3. **Measure-bound regions hold, and hand the surplus back.** Prose caps at `66ch`
>    (`VISUAL-CONSTITUTION.md:78`); a single slider caps at its comfort inline size. The refused width
>    returns to (1)/(2) — it does **not** become page gutter. Mechanically this is glass ask **G-3**;
>    the demo does not author it.
> 4. **The gutter is fluid and bounded.** `--app-gutter: clamp(0.75rem, 2.5cqi, 3rem)` replaces the
>    constant `1rem`. At 3440 that is 48px/side = 2.8% — earned breathing room, not 600px of nothing.

> **UL-3 — The coverage gate is route-classed, because a 2240px paragraph is also a defect.**
> - **Stage/field compositions (16 of 18):** content-width coverage **≥ 90%** at 3440×1440, and the
>   scene band's occupied block extent **≥ 90%** of its available height. Today: 30.5% / 45.4%.
> - **Measure-bound (`/about`, and recovery's article):** exempt from coverage. Its gate instead is
>   `article inline-size ∈ [60ch, 72ch]` **and** *zero companion boxes with zero content* — the actual
>   sin at 3440 is not a narrow column, it is a narrow column with an empty glass pane beside it
>   (`VISUAL-CONSTITUTION.md:28`, §3 law 2).

> **UL-4 — Aspect ratio never selects a layout.** Both `min-aspect-ratio` arms die. Portrait tablets
> were the reason they existed (the D6-03 pathology: two columns marooned on a 1080×1750 slab) — under
> ML-0 that case is answered by the container: a 1080-wide slab gives the chassis ≈1030px > 719px, so
> it stays two-column, which on a 1750-tall screen is *correct*. The pathology was an artifact of
> `--content-max-h` capping the pair at 52rem on a 1750px screen, and that token is gone.

---

## 4. THE MOBILE LAW (full width AND full height at 390, purpose exercisable at 320)

> **MB-1 — The document scrolls.** `.app-layout { height: 100dvh; overflow: hidden }` becomes
> `min-block-size: 100svh` with **no** `overflow`. This is the single highest-value line in the design:
> it converts "content that does not fit is gone" into "content that does not fit is below". Canon
> `:32` already mandates *"one document-scrolling stage→inspector→action sequence"*; today
> `docScrollable = 0` makes that clause literally unsatisfiable.

> **MB-2 — Nothing is unmounted for being narrow.** A region is never removed by width. The collapse
> is an *axis change* (`grid-template-columns: 1fr`), never a `v-if`. This kills the class that
> produced App D-1 (nine inert action-bar controls, because `:on-mount` was attached only to the
> desktop slots) and ConfigSliderPane D-2 (31 sliders absent from the DOM at 390) with one structural
> change — L-8, not a gate.

> **MB-3 — Full width means full width.** 16px symmetric gutter at 390 = 91.8% coverage today, which
> is already close; `--app-gutter`'s `clamp(0.75rem, …)` floor takes it to 12px = **93.8%**, and the
> chassis' own `clamp(1rem, 3cqi, 1.5rem)` dial padding is the *inner* inset. One inset owner, per
> canon `PR-33`. Cards stop being page columns (`<Card` count 21 → the canon's terminal inventory:
> one per palette entity, zero elsewhere).

> **MB-4 — Full height means the block axis is *spent*, not *capped*.** The scene band is
> `min-block-size: 0` inside `1fr`; the protagonist takes `1fr` of the route's own column and the
> sequence continues below the fold. The 73–78% height voids MT-F028 measured on
> `/browse` `/generate` `/mix` are *thin content in a fixed box* — once the box is `auto` and the field
> is `auto-fill`, thin content simply ends and the page ends with it. **A short page is not a defect;
> a short page inside a tall empty box is.** The gate is therefore stated as *no region taller than its
> content*, not *content fills the screen*.

> **MB-5 — 44px is a pointer property.** `--rail-row-min: 2.25rem`, raised to `2.75rem` under
> `@media (pointer: coarse)`. Retires the `(max-width:1023px)` rung and fixes the 39 measured
> small-tap-target entries at *desktop touchscreens* too — which the width query never could.

### BM-1 — the discriminator for a bespoke narrow arm

> A route earns a bespoke narrow composition **iff its controls and their observable effect live in
> different regions AND the interaction is continuous** (drag/scrub, where feedback must be
> *simultaneous* to be feedback at all).

Everything else is one composition, because the collapse reorders regions that were never
spatially coupled. Applying BM-1:

- **Blob, Atmosphere** — 31 and ~20 continuous sliders in the inspector; the effect is a WebGL preview
  in the stage. Canon demands both *"scroll-confined inspector"* (§3.1) and *"every select/axis has an
  observable effect on its live preview"* (§7). In a plain document-scroll sequence the preview leaves
  the screen by row 6 and the second clause fails. **Earned.**
- **Generate** — different regions, but Regenerate is a *discrete commit*: press, then look. Feedback
  need not be simultaneous. **Not earned.**
- **Picker, Gradient, Easing, Extract, Mix** — the manipulation surface *is* the effect surface
  (meniscus, stop rail, curve, image, operand rack). Nothing to keep in view that isn't already under
  the finger. **Not earned.**
- **Browse, Library, Admin×5, About, recovery** — discrete selection, no continuous coupling.
  **Not earned.**

---

## 5. PER-ROUTE COMPOSITION TABLE

Rows are the canon's binding 18 (`OPTICAL-BENCH-COMPOSITIONS.md` §3–§4), not today's 14 `ViewId`s.
`/easing` and `/about` **do not exist as routes today** (`viewSchema.ts` has neither; About ships as
Picker's companion, which `VISUAL-CONSTITUTION.md:58` forbids) — the law below binds them at creation.

| # | Route | Composition | Verdict | Reason (BM-1 applied) |
|---|---|---|---|---|
| 1 | `/` Picker | `golden` 61.8034/38.1966 | **ONE** | Meniscus is both control and effect. Collapsed order puts the readout directly above the channel rail. ⚠ verify at 320×568 (§10 U-2). |
| 2 | `/palettes` Library | field 64–66.7 / inspector 33.3–36 | **ONE** | `auto-fill` field; selection→inspector is discrete. Empty lane collapses via `:has()`, not a query. |
| 3 | `/browse` Browse | field 64–66.7 / inspector 33.3–36 | **ONE** | Same as Library. Unselected → field expands to full width (producer's inspector-absent expansion). |
| 4 | `/extract` Extract | `golden` | **ONE** | Sampler acts *on* the image; manipulation surface = effect surface. `touch-action: none` on the well keeps the drag from stealing document scroll. |
| 5 | `/mix` Mix | `golden` | **ONE** | Rack is `repeat(auto-fit, minmax(6rem,1fr))` — legible at 2, 3 and 12 from one declaration (canon §7). |
| 6 | `/generate` Generate | `golden` | **ONE** | Discrete commit; simultaneity not required. |
| 7 | `/gradient` Gradient | `golden` | **ONE** | Stops are dragged *on* the meniscus. |
| 8 | `/easing` Easing *(not yet routed)* | `golden`, 19–22rem stage | **ONE** | Control points dragged on the curve. The 19–22rem clamp is `clamp(19rem, 60cqi, 22rem)` — container, not viewport. |
| 9 | `/atmosphere` Atmosphere | `preview-dominant` 66.6667/33.3333 | **BESPOKE narrow** | Continuous sliders, remote effect. Persistent-stage arm. |
| 10 | `/blob` Blob | `preview-dominant` | **BESPOKE narrow** | Same, and the measured RED: 31 sliders → 0 at 390. |
| 11 | `/about` About *(not yet routed)* | structural article, no chassis | **ONE** | `66ch` measure; UL-3 exemption. No companion, ever. |
| 12–16 | `/admin/{users,names,audit,flagged,tags}` | full-width review field, no chassis split | **ONE** | Narrow arm is *row disclosure* — the same region set with the inspector inline. Container-driven. Companion pane `50% → 0` (canon `:51`). |
| 17 | Account | glass `Dialog` | **PRODUCER-BESPOKE** | Side dialog wide / full-inline narrow is `dialog/placement.css`, a producer file. Bespoke, **zero demo lines** — a prop. |
| 18 | Storage recovery | content-hug article in Library's main | **ONE** | Inline route state; measure-bound like About. |

**Tally: 15 ONE-LAYOUT · 2 BESPOKE-NARROW · 1 PRODUCER-BESPOKE.** The 2 bespoke routes share **one**
6-declaration rule (§6B), and glass ask **G-1** would reduce that to **zero demo lines**. That is the
answer to "without contrivance": the bespoke arm is 6 declarations serving 2 routes, justified by a
canon clause that is otherwise unsatisfiable — not a second design.

---

## 6. EXEMPLAR CSS — the two hardest routes

Sketch-grade. Comments mark every place I am guessing.

### 6A · The shell (both routes depend on it)

```css
/* demo/styles/shell.css — the whole layout surface after the cut.
   Deleted from this file: .pane-container, .pane-container--dual,
   .pane-wrapper--left/--right, the [data-layout] witnesses, and the
   @media (min-width:1024px) and (min-aspect-ratio:1.1) block. (The T-45
   oversampled-blur seat is orthogonal and untouched.) */

:root {
  /* ONE gutter, fluid and bounded — replaces --app-padding-x's constant 1rem,
     --pane-max, --pane-min, --pane-gap and --content-max-h (UL-1/UL-2.4).
     `cqi` at :root has no eligible container, so per spec it resolves against
     the small viewport — i.e. this IS the page-level measure, honestly spelled.
     `vi` would compute identically; `cqi` is used so the declaration reads the
     same as every other sizing expression in the design (ML-4). */
  --app-gutter: clamp(0.75rem, 2.5cqi, 3rem);   /* 12px @390 · 36px @1440 · 48px @3440 */
  --rail-row-min: 2.25rem;
}
@media (pointer: coarse) { :root { --rail-row-min: 2.75rem; } }   /* MB-5, capability */

.app-layout {
  display: grid;
  grid-template-rows: auto 1fr;                  /* dock band · scene band — unchanged (T-31) */
  row-gap: var(--dock-gap);
  min-block-size: 100svh;                        /* MB-1/ML-2: was height:100dvh */
  /* overflow: hidden  — DELETED. The document scrolls. */
  padding-block: var(--dock-inset) var(--phi-1);
  padding-inline: var(--app-gutter);
  position: relative;
}

/* .dock-band unchanged; <Dock> gains container-name="dock" so glass-ui's own
   @container dock rules stop being dead code (ML-3). */

/* THE ONE CONTAINER. inline-size only — `size` would contain the block axis
   and forbid MB-1 (ML-1). Nothing below this line reads the viewport. */
main.scene {
  container: scene / inline-size;
  min-inline-size: 0;
  min-block-size: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);   /* the LAST grid-template-columns in demo/styles */
}
```

### 6B · `/blob` — `preview-dominant`, the bespoke pair's exemplar

Chosen as hardest because it carries the measured RED (0 of 31 sliders at 390), a live WebGL stage
that must remain observable, a 3.7-screen inspector, and the canon's strictest housing clause
(*"no settings Card stack"*, `OPTICAL-BENCH-COMPOSITIONS.md:47`).

```vue
<!-- demo/scenes/blob/BlobScene.vue — replaces the right-pane + ConfigSliderPane
     Card + .console-well + hand-rolled scroller. -->
<InstrumentChassis
  proportion="preview-dominant" :boundaries="[]" reserve="none"
  class="scene-fill scene--persistent-stage"
>
  <template #stage><BlobPreview class="blob-stage" /></template>
  <template #inspector>
    <BlobEssentials class="blob-bank" />
    <BlobAdvanced   class="blob-bank" />
  </template>
  <template #action><ResetButton /><CompareButton /><CopyJsonButton /></template>
</InstrumentChassis>
```

```css
/* demo/scenes/blob/blob.css — 100% of this route's layout CSS. */

/* Fill the scene band's grid row. GUESS: I am authoring block-size here because
   the producer has no fill arm; that is glass ask G-5 and this rule retires
   with it. It is not `grid CSS` in the canon's sense (no template), but it is
   the closest this design comes to the §5 boundary and is flagged as such. */
.scene-fill, .scene-fill :where(.instrument-composition) { block-size: 100%; min-block-size: 0; }

/* THE STAGE — a preview whose job is to be observed *while* operated. */
.blob-stage {
  min-block-size: 0;
  aspect-ratio: 1;                 /* wide arm; the chassis grid supplies the width */
  container-type: inline-size;     /* the canvas sizes from ITS box, never from vw */
}

/* THE INSPECTOR — scroll-confined per canon §3.1. Density is producer-driven:
   glass-ui ships `@container style(--configurator-size: sm|md|lg)` already, so
   ConfigSliderPane's local `min-block-size: clamp(2rem,7cqi,2.625rem)` (:208-217)
   is deleted rather than retuned. */
.instrument-inspector {
  min-block-size: 0;
  overflow-block: auto;            /* ⚠ ML-6: support unverified — see §10 U-1 */
  overscroll-behavior-block: contain;
  scrollbar-gutter: stable;
  --configurator-size: md;
}
@container scene (inline-size < 30rem) { .instrument-inspector { --configurator-size: sm; } }

/* UL-2.2 — surplus becomes COLUMNS of rows, not one 2100px slider.
   31 rows: 1 col @390 · 1 col @1440 (inspector ≈ 340px) · 3–4 cols @3440
   (inspector ≈ 1100px) → scrollHeight collapses to clientHeight, zero scroll. */
.blob-bank {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: var(--instrument-control-gap);   /* producer S122 token, never a local value */
  align-content: start;
}

/* ── THE BESPOKE NARROW ARM — 6 declarations, shared with /atmosphere ──
   Below the chassis' own collapse the stage would stack above the inspector and
   scroll away by row 6. Every one of the 31 rows is a claim about the preview;
   a control whose effect you cannot see is the same defect as a control that is
   not there (D-2). So the stage becomes a sticky observation window and the
   inspector scrolls *under* it — the document scrolls (MB-1), not an inner box.
   Retires entirely on glass ask G-1. */
@container scene (inline-size < 45rem) {
  .scene--persistent-stage .blob-stage {
    position: sticky;
    inset-block-start: 0;
    aspect-ratio: 3 / 2;             /* a window, not a page */
    max-block-size: 40svh;           /* svh: the URL-bar collapse can't shrink it below usable */
  }
  .scene--persistent-stage .instrument-inspector { overflow-block: visible; }
}
/* NOTE: `position: sticky` establishes its own stacking context, so no z-index
   is minted — the shell's "zero z-index" law (shell.css:18) survives intact. */
```

**Measured before → predicted after (`/blob`):**

| | 390×844 today | 390×844 after | 3440×1440 today | 3440×1440 after |
|---|---|---|---|---|
| sliders in DOM | **0** | 31 | 31 | 31 |
| preview visible while row 31 operated | n/a | yes (sticky) | yes | yes |
| inspector `scrollHeight/clientHeight` | n/a | ~3.7 (document) | **2605/695 = 3.7** | ~1.0 (4 columns) |
| stage width coverage | n/a | 93.8% | **30.5%** | ≥90% |

### 6C · `/` Picker — `golden`, the exemplar for the ONE-layout majority

Chosen as the second-hardest: it is the most-visited route, it carries the binding §3.2 crop
correction (an *exact* `I_after ≤ min(φG, I_before − G)` ink inequality keyed to the producer's
`--instrument-title-gap`), the corner-breaking HeroBlob ornament, and a direct-manipulation canvas that
must coexist with MB-1's newly-scrolling document.

```css
/* demo/scenes/picker/picker.css — 100% of this route's layout CSS. */

/* THE STAGE — one vertical argument (canon §7 Picker). The row gap IS the
   producer's --instrument-title-gap: §3.2 makes G load-bearing, so a local
   value here would break a binding inequality. No local spacing token. */
.picker-stage {
  display: grid;
  grid-template-rows: auto auto auto 1fr;   /* identity · readout · selector · meniscus */
  row-gap: var(--instrument-title-gap);
  block-size: 100%;
  min-block-size: 0;
}

/* THE MENISCUS — the only element that owns an aspect; it absorbs whatever the
   fixed rows leave. Replaces the 5-value viewport fork
   `h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none` with 4 declarations
   and no breakpoint. `touch-action: none` is what makes MB-1 safe: the drag
   surface can never steal the document scroll it now shares a page with. */
.picker-meniscus {
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 6rem;
  aspect-ratio: 16 / 9;    /* honoured when block space allows; 1fr wins when it doesn't */
  touch-action: none;
}

/* THE CHANNEL RAIL — UL-2.2 in its purest form. 4 channels (L·a·b·α):
     inspector 358px @390  → 1 column
     inspector ≈520px @1440 → 2 columns
     inspector ≈1285px @3440 → auto-fit stops at 4 (content exhausted) × 321px
   A 4-across rail at 3440 is genuinely better than one 1285px slider, and it
   arrives from ONE declaration with no query and no ultrawide special case. */
.picker-channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  grid-auto-rows: minmax(var(--rail-row-min), auto);   /* MB-5 */
  gap: var(--instrument-control-gap);
  min-block-size: 0;
  align-content: start;
}
```

**No narrow arm.** Collapsed order is stage → channels, so the readout sits directly above the rail
being dragged; BM-1 is not met and none is authored. **Honest risk (§10 U-2):** at 320×568 the stage
(identity + readout + selector + a 6rem-floored meniscus ≈ 380px) may push the rail's lower rows past
the fold *while* the readout scrolls off the top — the one case where the Picker could earn what Blob
earned. It is measurable, not arguable: W-L3's π matrix adds a 320 arm and the answer decides whether
`.picker-stage` joins `.scene--persistent-stage`. I am not deciding it from a chair.

---

## 7. GLASS ASKS

Boundary-respecting: each is a *producer* change, relayed to the glass-ui BH inbox per the standing
relay edict. Every one **deletes** demo lines; none is a local build. Prefixed with what already ships
so the asks stay small and honest.

**Already shipping, no ask needed** (verified by reading `instrument-chassis/styles.css`):
container-type · `cqi` S122 spacing tuple · container-query collapse at 44.9375rem · exact unbounded
`golden`/`preview-dominant` `fr` · `--instrument-stage-reserve`/`--instrument-inspector-reserve` ·
`[data-has-inspector]` · `@container dock` density rules · `@container style(--configurator-size)`.

| # | Ask | Why it cannot be local | Deletes |
|---|---|---|---|
| **G-1** | `InstrumentChassis` gains a **persistent-stage collapse arm** — inside its own `@container (max-width:44.9375rem)`: `.instrument-stage { position: sticky; inset-block-start: var(--instrument-stage-persist-inset, 0); max-block-size: var(--instrument-stage-persist-max, 40svh) }`, opt-in via prop. | The collapse rule lives inside the producer's own container context; a consumer cannot enter it without duplicating the 44.9375rem threshold — i.e. minting a second mechanism. | the whole §6B narrow arm (6 decls × 2 routes) → **0** |
| **G-2** | **Scroll-confined inspector** as a producer arm: `min-block-size:0; overflow-block:auto; overscroll-behavior-block:contain; scrollbar-gutter:stable`. | Canon §3.1 names "scroll-confined inspector" as *housing*, and housing is P122's. The demo hand-rolled it and shipped it wrong: `.config-console` at 2605/695 with `maskImage: none` and no scroll affordance. | ConfigSliderPane's scroller + the demo's `overflow-block` guess (§10 U-1 becomes the producer's problem) |
| **G-3** | **`--instrument-comfort-inline`** on the inspector track: `minmax(0, min(38.1966011fr, var(--instrument-comfort-inline, 100%)))`, surplus returning to the stage. | UL-2.3 must not be a demo cap — a demo `max-inline-size` on the inspector is exactly the `--pane-max` mistake at a smaller scale. | the only remaining reason a demo would author an ultrawide cap |
| **G-4** | **Coarse-pointer control rung** on `Slider`/`configurator-row`: hit target ≥44×44 under `@media (pointer: coarse)`. | Measured thumb is **12×24 at both 1440 and 390** (39 small-tap entries in `REPORT.json`); the producer owns the control atom. | `ConsoleRail.vue:323`'s `(max-width:1023px)` rung — the 7th viewport media rule |
| **G-5** | **Chassis block-fill arm** (`fill` prop → `block-size:100%; min-block-size:0` on chassis + composition). | `OPTICAL-BENCH-COMPOSITIONS.md:106`: *"value owns the route main and adds no grid CSS."* Without it every route authors `.scene-fill` — 18 copies of a producer decision. | `.scene-fill` (§6B), everywhere |
| **G-6** *(defect relay, not a request)* | `@container dock (…)` rules in `dock/styles/density.css` never match unless the consumer passes `containerName`. Either default `container-name: dock` on `.glass-dock`, or document the requirement. | Producer-internal rules gated on a consumer opt-in that nothing documents. | — (demo-side fix is one prop; the relay prevents the next consumer paying for it) |

---

## 8. WAVE SPECS

Four waves, FORMATION-LAWS template. Ordered by *value delivered alone*, not by dependency.

---

```
WAVE V·L1 — THE BLOCK LAW (the shell stops capping the block axis)

DEFECT      Mobile cannot scroll and ultrawide is height-capped at 42% of the screen.
            node <scratchpad>/geo.mjs → today:
              390×844  #/      docScrollable=0   (shell.css:23,26 height:100dvh + overflow:hidden)
              3440×1440 #/     pcH/scene=45.4%   (--content-max-h=clamp(30rem,62dvh,38rem)=608px)
              grep -c svh demo/ → 0 ; grep -c 100dvh demo/styles/shell.css → 1
BORN        RED — all four reproduce on today's tree, output pasted above.
SCOPE       demo/styles/shell.css (.app-layout), demo/styles/foundation.css
            (delete --content-max-h + both @media aspect blocks + --pane-* tokens'
            block-axis role). EXACT END STATE: .app-layout is
            `min-block-size:100svh` with no overflow declaration; --content-max-h
            is undefined; viewport @media count 7→5.
STRUCTURE   L-8. Deleting the token makes "cap the page height by viewport aspect"
            unrepresentable — there is no property left to set. No gate needed for
            the class; the gates below assert the *product*, not the absence.
GATES       1. `probe(390×844, every member route).documentElement.scrollHeight >
               clientHeight` wherever content exceeds the viewport.
               RED INPUT: today's `.app-layout{overflow:hidden}` → 0 on all routes.
            2. `getComputedStyle('.pane-main').maxHeight === 'none'` at 3440×1440.
               RED INPUT: today resolves 608px.
            3. Occupied block extent of the scene band ≥90% of its available height
               at 3440×1440 on the 16 non-measure-bound compositions.
               RED INPUT: 45.4% today.
            4. `grep -c '100dvh' demo/styles/shell.css` = 0 AND `grep -rc 'svh' demo/` ≥ 1.
               RED INPUT: 1 and 0 today.
            5. CSS.supports('overflow-block:auto') recorded (resolves §10 U-1 for W-L4).
π           390×844 · 1440×900 · 3440×1440 × {#/, #/blob, #/browse} ; selector
            `.app-layout, .pane-main` ; committed to
            audit/visual/layout/{vp}-{route}.png — force-added past .gitignore:34 (L-7).
DELTA       3440 before: stage 1049.9×608 in 3440×1440. After: block extent ≥90%.
            390 before: docScrollable 0 / text 69. After: scroll > 0.
CARRIES     MT-F028 (block-axis half) → BUILD here. App D-2 → FOLD (W-L2/L3 own it).
BANKS       overflow-block support: `node -e "…CSS.supports…"` — if false, ship
            overflow-y and re-run this exact command at each glass/browser bump.
ENV         WebKit/playwright at the dev server. Blind to: build output (MT-F012),
            real-Safari-only layout (MT-F025 — safaridriver needs the owner's
            "Allow Remote Automation" toggle; recorded as unmet, not reported green).
COMPLETABLE YES. Alone: mobile gains a scrolling document and ultrawide gains 2.2× the
            block extent, with the 50/50 grid untouched. Strictly better, closes on
            its own evidence.
```

---

```
WAVE V·L2 — ONE MOUNT, ONE COLUMN (the breakpoint fork dies)

DEFECT      A JS breakpoint remounts a different subtree, so nine action-bar controls
            are inert at mobile (App D-1) and 13 of 14 routes amputate a region at
            390 (measured text 69 vs 893 = 7.7% on #/; 0 of 31 sliders on #/blob).
            grep -c 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex' demo/ → 37
            test -e demo/shell/PaneSegmentedControl.vue → present (52 LoC)
BORN        RED — App.vue:77/94 (v-if/v-else) and :310 (useBreakpoint) on today's tree.
SCOPE       demo/color-picker/App.vue · demo/shell/usePaneRouter.ts ·
            demo/shell/useViewManager.ts · demo/shell/viewSchema.ts ·
            DELETE demo/shell/PaneSegmentedControl.vue · demo/styles/shell.css
            ([data-layout] witnesses + .pane-wrapper--ghost).
            EXACT END STATE: one mount path; PaneConfig's `left`/`right`/
            `defaultPaneIndex` collapse to one ordered `regions[]`; both regions
            always mount; narrow = one stacked column (the grid's default
            `minmax(0,1fr)`), wide = the existing two-column arm (ratio is W-L3's).
STRUCTURE   L-8, and this is the wave's whole point. With one mount path and one
            ordered region list, "instance registration desynchronises with the
            breakpoint" (D-1's mechanism) has no place to occur. Additionally type
            PaneSlot's onMount over the mounted instance so the D-13 `any` cannot
            hide the next one. No gate replaces this; the structure does.
GATES       1. At 390×844, region roots present with nonzero rects on all 14 routes,
               and body innerText length ≥ 0.9× the same route's 1440 value.
               RED INPUT: 69 vs 893 (7.7%) on #/ today.
            2. Action-bar liveness: dispatch the /generate `regenerate` action at
               390×844 and assert the specimen changes.
               RED INPUT: today `{"label":"mobile-390","specimenChanged":false}`
               vs desktop `true` (D-1's own reproduction, re-used verbatim).
            3. `grep -rc 'useBreakpoint\|isDesktop\|isMobile\|mobilePaneIndex'
               demo/ --exclude-dir=node_modules` = 0 for layout call sites.
               RED INPUT: 37 today (13 files listed in §0).
            4. `test ! -e demo/shell/PaneSegmentedControl.vue`. RED INPUT: exists.
            5. Viewport @media count 5→3.
π           390×844 · 720×450@2 (the 200%-zoom arm — MT-F022 #4 says this path is
            CORRECT today and must not regress) · 1440×900 × {#/, #/generate, #/blob}.
DELTA       #/blob 390: sliders 0→31. #/generate 390: specimenChanged false→true.
CARRIES     App D-1 → FOLD (dissolved, not fixed). App D-2 → BUILD (this is half of
            the architecture retirement; W-L3 is the other half). ConfigSliderPane
            D-2 → FOLD (the DOM half lands here; the composition half is W-L4).
            App D-4 (missing H1/skip link) → NOT CARRIED: it is a landmark/a11y row
            owned by W19, named here only so it is not lost in the shell rewrite.
BANKS       none.
ENV         as V·L1. Note L-12: this wave's gates are DOM-presence and behaviour, both
            of which the dev server can witness; no bundle claim is made.
COMPLETABLE YES. Alone, at 390 you get every region of every route in a scrolling
            column and nine dead controls come alive — the single largest content
            delta in the program (7.7% → ~100%).
```

---

```
WAVE V·L3 — THE INLINE LAW (50/50 → canon ratio; the ultrawide cap dies)

DEFECT      The desktop split is exactly 50.0000% at every width ≥1024, 11.80
            percentage points from the nearest legal ratio, and is hard-capped at
            1049.9px so 3440 gets 30.5% coverage and ~600px of dead gutter per side.
            getComputedStyle('.pane-container').gridTemplateColumns → "512px 512px"
            at 1440, 2560 AND 3440 (measured).
BORN        RED — shell.css:133-138 + foundation.css:440-442 on today's tree.
SCOPE       demo/color-picker/App.vue (render InstrumentChassis around the two region
            slots) · demo/shell/viewSchema.ts (+1 field per row:
            `proportion: "golden" | "preview-dominant"`) · demo/styles/shell.css
            (delete .pane-container/--dual + the last grid-template-columns) ·
            demo/styles/foundation.css (delete --pane-max/--pane-min/--pane-gap +
            --app-padding-x → --app-gutter) · the 58 Tailwind responsive prefixes.
            EXACT END STATE: zero grid-template-columns in demo/styles/; zero
            viewport @media; zero sm:/md:/lg: prefixes; ratio is producer data.
            NOTE: this is a *data* change per route (one field × 14 rows), not 18
            component rewrites — route bodies land in #stage/#inspector unchanged and
            their interiors stay with their W18–W30 owners.
STRUCTURE   L-8. Once the ratio is a producer prop with a two-member union type, "ship
            an illegal ratio" is a type error. Once the shell declares no columns,
            "one ratio imposed on eleven compositions" (D-3's mechanism) is
            unrepresentable. Two gates below still exist because *deletion* of the
            Tailwind prefixes is a count, not a structure.
GATES       1. `.instrument-composition` gridTemplateColumns ratio ∈
               {61.8034/38.1966, 66.6667/33.3333} within ±0.5px on every two-region
               route at 1440. RED INPUT: "512px 512px" = 50/50 today.
            2. Content-width coverage ≥90% at 3440×1440 on the 16 non-measure-bound
               compositions. RED INPUT: 30.5% today.
            3. `/about`'s article inline-size ∈ [60ch,72ch] at 3440 AND zero
               zero-content companion boxes. RED INPUT: About renders as Picker's
               50% companion today (viewSchema.ts:107).
            4. `grep -rcE '@media[^{]*(min-width|max-width|aspect-ratio)' demo/
               --exclude-dir=node_modules` = 0. RED INPUT: 7 today (list in §0).
            5. `grep -rcoE '\b(sm|md|lg|xl|2xl):' demo/ --include=*.vue` = 0.
               RED INPUT: 58 today across 19 files.
            6. `grep -c 'pane-max\|pane-min\|pane-gap\|content-max-h' demo/` = 0.
               RED INPUT: 4 tokens, 17 consumers.
π           320×568 · 390×844 · 1440×900 · 3440×1440 × all member routes; plus the
            actual-400%-in-app-zoom arm PROPORTION-AUDIT.md:16 requires (reachable
            only after V·L1 — today 200% already clips).
DELTA       3440 #/: 1049.9px stage → ≥3090px; ratio 50/50 → 61.8/38.2.
CARRIES     App D-3 → BUILD (the ratio). App D-2 → BUILD (completes the retirement
            begun in V·L2). MT-F028 (inline half + mechanism census) → BUILD.
BANKS       G-3 (--instrument-comfort-inline): re-trigger
            `node -e "process.exit(/--instrument-comfort-inline/.test(require('fs')
            .readFileSync('node_modules/@mkbabb/glass-ui/dist/components/
            instrument-chassis/styles.css','utf8'))?0:1)"`
ENV         as V·L1, plus: gate 5 is a source grep (scoped, node_modules excluded, L-9).
COMPLETABLE YES. Alone it converts every desktop scene from an arbitrary 50/50 to the
            binding proportion and removes the ultrawide cap. It presumes V·L1's block
            law for the *height* half of gate 2 — stated, not hidden.
```

---

```
WAVE V·L4 — THE PROVING PAIR (/blob + /atmosphere earn their narrow arm)

DEFECT      /blob's sole purpose is unreachable below 1024px (0 of 31 sliders in the
            DOM at 390), the inspector is a 3.7-screen hand-rolled scroller with no
            affordance, and it is housed in a Card the canon forbids.
            breakpointSweep: 1440/1280/1100/1024 → 31 rows; 1000/900/768/600/390 → 0.
            .config-console scrollHeight 2605 / clientHeight 695, maskImage none.
            <Card tier="resting"> at ConfigSliderPane.vue:99-101; canon
            OPTICAL-BENCH-COMPOSITIONS.md:47 "no settings Card stack".
BORN        RED — all four reproduce today.
SCOPE       demo/scenes/blob/ · demo/scenes/atmosphere/ · demo/scenes/ConfigSliderPane.vue
            (Card + .console-well + local row clamp + local scroller DELETED).
            EXACT END STATE: both routes are InstrumentChassis preview-dominant with
            the shared .scene--persistent-stage arm (§6B); row density comes from
            glass's `@container style(--configurator-size)` seam; Card count 0.
STRUCTURE   L-8 partially: deleting the local row clamp and the local scroller makes
            the two divergent narrow behaviours of one shared pane unrepresentable —
            there is one composition. Gate 2 remains a gate because "the preview is
            visible while row 31 is operated" is a rendered relation, not a type.
GATES       1. At 390×844 on #/blob: 31 [role=slider] present, all enabled, every hit
               target ≥44×44. RED INPUT: 0 sliders today; thumb 12×24 today.
            2. Scroll the last inspector row into view at 390×844 and assert the
               stage's rect intersects the viewport with area > 0.
               RED INPUT: 0 (no stage in DOM today); and 0 again if V·L2 lands the
               regions without this wave's sticky arm — which is what makes the arm
               *earned* rather than decorative.
            3. At 3440×1440 the inspector renders ≥3 row columns AND
               scrollHeight ≤ clientHeight. RED INPUT: 2605/695 = 3.7 screens today.
            4. `grep -c '<Card' demo/scenes/ConfigSliderPane.vue` = 0 AND
               `grep -c 'min-block-size: clamp' demo/scenes/ConfigSliderPane.vue` = 0.
               RED INPUT: 1 and 1 (ConfigSliderPane.vue:99, :208-217).
π           390×844 · 1440×900 · 3440×1440 × {#/blob, #/atmosphere}, plus one
            scrolled-to-last-row frame at 390 (the gate-2 witness) — committed.
DELTA       #/blob 390: sliders 0→31, preview visible during operation false→true.
            #/blob 3440: inspector 3.7 screens → 1.
CARRIES     ConfigSliderPane D-2 → BUILD (this wave is its cure). ConfigSliderPane
            D-12 (local row clamp) → FOLD. The other ConfigSliderPane rows (D-1/D-3
            spectrum variant, D-4 valuetext, D-14 contrast) are CONTROL defects, not
            layout — NOT CARRIED here; they stay with their own owner. Naming them so
            the layout wave is not credited with curing them.
BANKS       G-1 (persistent-stage arm): re-trigger
            `node -e "process.exit(/position:\s*sticky/.test(require('fs')
            .readFileSync('node_modules/@mkbabb/glass-ui/dist/components/
            instrument-chassis/styles.css','utf8'))?0:1)"` — on 0, delete §6B's arm.
            G-2 (inspector scroll): same file, test /overscroll-behavior/.
ENV         as V·L1. Gate 3's column count is geometry; gate 1's hit-target is
            geometry; neither needs the API, which is down (data states invalid).
COMPLETABLE PARTIALLY-ALONE, stated honestly: the desktop arm (gates 3 and 4, the
            chassis adoption, the Card deletion, the density seam) closes with no
            other wave. Gates 1 and 2 need V·L2's "both regions mount" to be
            reachable at 390. Preferred order V·L1 → V·L2 → V·L3 → V·L4; if only
            this wave ever ran, it would close on gates 3+4 with 1+2 recorded as
            blocked-with-named-unlock, never as green.
```

---

## 9. WHAT THE DESIGN COSTS (the owner's "fewer lines" test, answered)

| | today | after | Δ |
|---|---|---|---|
| adaptation sites (media + Tailwind + JS) | 102 | **1 mechanism** | −101 |
| viewport `@media` rules | 7 | 0 | −7 |
| layout tokens (`--pane-*`, `--content-max-h`) | 4 (+17 consumers) | 1 (`--app-gutter`) | −3 |
| `grid-template-columns` in `demo/styles/` | 2 | 1 (the scene's `1fr`) | −1 |
| files deleted outright | — | `PaneSegmentedControl.vue` (52 LoC) | −52 |
| `shell.css` layout rules (lines 12–139) | ~90 | ~35 | −55 |
| bespoke mobile compositions | 1 implicit (the whole mobile grammar) | 2 explicit arms sharing 6 declarations | −1 grammar |
| new demo abstractions | — | **0** (no wrapper components, no `shared/` dir) | 0 |

The only *additions* are: `--app-gutter`, `--rail-row-min`, `container: scene / inline-size`, and one
`proportion` field per `viewSchema` row. Everything else in this design is a deletion or a producer
prop.

---

## 10. UNKNOWNS — what I did not verify, stated plainly

- **U-1 · `overflow-block` / `overscroll-behavior-block` support.** No `browserslist`, no Vite
  `target` in this repo, so I have no ground truth. ML-6 flags it; V·L1 gate 5 resolves it with one
  `CSS.supports` call; the physical-axis fallback is written. **Do not ship the logical form on my
  say-so.**
- **U-2 · The Picker at 320×568.** My BM-1 verdict (ONE layout) rests on the readout staying visible
  above the channel rail in the collapsed order. I measured 390 and up. At 320 the stage may exceed the
  fold and the Picker would earn what Blob earned. V·L3's π matrix adds the 320 arm; the measurement
  decides, not this document.
- **U-3 · The chassis' collapse threshold against real content.** 44.9375rem is the producer's number.
  I have not rendered a real value.js region set inside a 719px chassis — the demo has **zero**
  `InstrumentChassis` consumers. The first wave to adopt it must record whether 719px is the right
  place for *these* compositions and, if not, relay a producer ask rather than shadowing it locally.
- **U-4 · The HeroBlob ornament under `overflow: clip`.** `.instrument-chassis` declares
  `overflow: clip`. The Picker's corner-breaking ornament (and the T-45 oversampled-blur carrier, which
  uses `inset: calc(-2 * blur)`) both deliberately paint outside their box. Adopting the chassis may
  clip them. I did not test this. It is the most likely surprise in V·L3 and it may become glass ask
  G-7 (`overflow: visible` arm) — recorded now so it is not discovered as a regression.
- **U-5 · Real Safari.** Every measurement here is WebKit-via-playwright. Per MT-F025, `safaridriver`
  session creation fails pending the owner's *Safari → Develop → Allow Remote Automation* toggle. Any
  claim in this design that says "Safari" means WebKit. Recorded as unmet, not reported green.
- **U-6 · API-less dev server.** Data-backed routes (`/browse`, `/palettes`, admin) read low on text at
  every viewport, which cancels out of mobile-vs-desktop comparisons but makes the absolute
  `body.innerText` numbers in V·L2 gate 1 unusable as thresholds until the API is up. The gate is
  written as a *ratio* (mobile ≥ 0.9 × desktop, same route, same run) for exactly this reason.

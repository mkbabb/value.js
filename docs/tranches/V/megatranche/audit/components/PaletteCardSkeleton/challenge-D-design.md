# CHALLENGE-D — `PaletteCardSkeleton.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict: **DEFECTIVE (BLOCKER)**

Not "needs polish". The component's *entire visual and temporal grammar is inert*. It drives
seven producer seams, **five of which do not exist in `@mkbabb/glass-ui@7.0.0`**, and one prop
channel (`variant`) whose two values render pixel-identically. 43% of the file (53 of 124 lines)
is prose describing a choreography that has never once run in this repository.

The single sentence that summarises the defect:

> **The file is a design document larger than the design, and the design it documents is not the
> one on screen.** What ships is twelve near-white 4px-radius rectangles, scanning in lockstep,
> *lighter* than the plate they sit on — the exact inverse of the certified "shadow ink" the
> source spends five paragraphs justifying.

Subject: `demo/palettes/browser/card/PaletteCardSkeleton.vue` (124 lines).
Consumers: `demo/palettes/BrowsePane.vue:49` (×4, `developing`), `:130` (×2, `developing`),
`demo/workbenches/extract/ExtractWorkbench.vue:103` (×1, `shadow`).
Routes: `/#/browse`, `/#/extract`. Area: palettes.

---

## 0. Evidence protocol

Everything below is a measured number, a pasted command output, a file:line, or a quoted canon
clause. Three live Playwright sessions against the running dev server at `http://localhost:9000`
(`page.route('**/palettes*')` held open 9–25 s to pin the mid-fetch state; the app's own
`e2e/smoke/fixtures/browse-palettes.ts:routeBrowsePalettesDelayed` idiom). Nothing was written
outside this directory; no source was edited.

Screenshots produced by this seat live in the session scratchpad
(`.../scratchpad/p3-full-light.png`, `skel-crop-light.png`, `p2-{light,dark,prm,forced,rtl}.png`,
`p6-extract-kmax.png`).

---

## 1. Findings

### D-1 · **BLOCKER** · The component drives five glass-ui seams that do not exist. Both registers are the same pixels.

`glass-ui@7.0.0`'s `Skeleton` accepts **one** prop:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts
type __VLS_Props = {
    class?: HTMLAttributes["class"];
};
```

`PaletteCardSkeleton.vue:41-44,57-58,63-64,72-74` passes `surface="glass"` and
`:variant="blockVariant"` to it. Those are not props. They fall through and land in the DOM as
**literal invalid HTML attributes** — measured, live:

```
segOuterHTML: <div data-v-cd03d0b0="" data-v-5d73e53e="" surface="glass" variant="breath"
              data-slot="skeleton" aria-hidden="true" class="skeleton h-full rounded-none"
              style="width: 20%; --i: 0; --skeleton-shimmer-delay: 0s;"></div>
```

The custom-property seams fare no better:

```
$ grep -rn "skeleton-shimmer-delay\|skeleton-shimmer-tint\|skeleton-glass-bg" node_modules/@mkbabb/glass-ui/dist/
(no output)
$ grep -rn "pulse-aura-opacity-max\|animate-ambient-pulse-easing" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

The producer's complete Skeleton implementation (extracted from `dist/glass-ui.css`) is:

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);
  background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg,transparent 24%,
  color-mix(in oklab,var(--foreground) 10%,transparent) 48%,transparent 72%);position:absolute;inset:0}
@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{
  animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;
  will-change:transform;transform:translate(-110%)}}
```

There is no `variant` branch, no `surface` branch, no `background: var(--skeleton-glass-bg)`, no
`animation-delay`, no `--skeleton-shimmer-tint`, no breath keyframe.

**Consequences, all of them design consequences:**

| Source claims (line) | Reality |
|---|---|
| `:99` `blockVariant` → `"shimmer"` \| `"breath"` — two temporal registers | one register. `shadow` and `developing` are **pixel-identical** |
| `:10-22` "the sequential top-to-bottom sweep for the unknown-duration NETWORK wait" | never ran |
| `:110-112` `.skeleton-seg { --skeleton-glass-bg: var(--specimen-ink) }` — the specimen accent seams | never read; `--specimen-ink` resolves to `<empty>` on the segment (probed: the `@supports` mix in `utils.css:75-83` is never consulted because nothing reads the variable) |
| `:114-123` "D9 known-imminent breath … 0.55 ↔ 0.75 … tuned ONLY through the published seams" | there is no pulse. The whole scoped `<style>` block is dead |
| `:96-99` "`shadow` breathes (the known-imminent rung)" | `shadow` scans, exactly like `developing` |

The `variant` prop, the `blockVariant` computed, the entire `<style scoped>` block, and 22 lines
of template comment are **decoration around a void**. This is not a bug that snuck in — the source
*announces* it at `:18-22`: *"the choreography goes live the day glass-ui's shimmer reads them"*.
Shipping a two-register design whose differentiator is scheduled for an unspecified future day is
a design defect, not a deferral: the product ships one register today while its API, its docs and
its two call sites all assert two.

**Reproduction:** `node` the probe in §5, or just read the `.d.ts` above.

---

### D-2 · **BLOCKER** · The ink polarity is inverted in *both* schemes. The certified tone-step never reaches a pixel.

`demo/styles/utils.css:57-61` certifies the loading ink as a bounded tone-step **of the well
ground**, and the comment at `:47-56` states the contract explicitly:

> *"darker than the well in light, lifted above it in dark — the scheme-adaptive direction falls
> out of the token, no per-scheme fork"*

Because glass-ui paints `background: var(--muted)` (D-1), the certified ink is never consulted.
Measured live on `/#/browse`, mid-fetch, at 1440×900:

| | designed `--skeleton-ink` (oklab L) | **painted** segment (oklab L) | plate `--well-bg` (oklab L) | designed ΔL | **actual ΔL** |
|---|---|---|---|---|---|
| light | 0.80872 | **0.9654** (`rgb(246,243,239)`) | 0.913295 | **−0.105** | **+0.052** |
| dark | 0.43228 | **0.2287** (`rgb(31,28,25)`) | 0.345295 | **+0.087** | **−0.117** |

The sign is **flipped in both schemes**, and in light the magnitude is halved. The consequence is
not academic — it is the first thing you see:

- **Light:** the ghost blocks are *lighter* than the card. They read as **holes punched out of the
  plate**, not as ink developing onto it. The `skel-crop-light.png` 3× crop shows near-white
  `#f6f3ef` rectangles floating on a warm beige well.
- **Dark:** the blocks are *darker* than the plate — the exact "featureless slab / seg-vs-well
  collapse" failure that `utils.css:44-46` records as **already cured** ("E1-R2 (T.W8
  remediation_1)"). It was cured for `ShadowPalette`. It was never cured here, because this
  consumer's ink channel is disconnected.

`utils.css:42` names this component as a consumer of the certified recipe. **It is not one.**

**Reproduction:** §5 probe → `desktopLight.segBg`, `desktopDark.segBg`, `.designedInk`, `.rootBg`.

---

### D-3 · **MAJOR** · Every corner radius the component declares is silently overridden by the producer. The strip is not a strip.

Three of the four radius intentions in the template lose the cascade to
`.skeleton[data-v-cd03d0b0]{border-radius:var(--radius-input)}` — a `(0,2,0)` unlayered selector
against Tailwind utilities that live in `@layer utilities` (confirmed live: the document declares
`@layer theme, base, components, utilities;`; unlayered always wins).

| Line | Declared | Intended computed | **Measured computed** |
|---|---|---|---|
| `:45` strip segments | `rounded-none` | `0px` | **`4px`** |
| `:59,65` meta blocks | `rounded-md` | `6px` | **`4px`** |
| `:76` swatch ghosts | `rounded-badge` | **`9999px`** (`--radius-badge: var(--radius-pill)`, `glass-ui/dist/styles/theme/radius.css:1`) | **`4px`** |

Look at `skel-crop-light.png`. The "color strip — the plate develops left to right" (`:38`) is not
a strip: it is **five separate rounded pills with valleys of plate showing between them**, and the
outer two fight the card's own 16px `rounded-card` clip, leaving an irregular, unresolved top edge.
The swatch ghosts, which the source intends as **circles**, are hard 4px squares.

The proof that this is an override and not an intention: the sibling `ShadowPalette.vue`, whose
strip cells are plain `<div>`s with no producer rule, measures exactly what it declares —

```
ShadowPalette k=5 (live, /#/extract):  segRadius "0px"   swRadius "9999px"
PaletteCardSkeleton count=5 (live):    segRadius "4px"   swRadius "4px"
```

Two files that declare the same corner geometry render different corner geometry.

---

### D-4 · **MAJOR** · The skeleton does not predict the layout it stands in for. It is 25% too tall and structurally wrong.

A skeleton has exactly one job: be the silhouette that arrives. Measured on `/#/browse` at
1440×900, same grid, same session (mocked page-1 payload, 5 colors per palette):

| | `PaletteCardSkeleton` | loaded `PaletteCard` (collapsed — the Browse default) |
|---|---|---|
| root height | **150 px** | **120 px** |
| colour strip | 40 px | 40 px ✓ |
| metadata band | **40 px** | **56 px** |
| swatch row | **68 px** (5 × 56) | **absent** (`swatchRowPresent: false`; `childCount: 3`) |
| root `overflow` | `hidden` | `visible` |
| cast shadow | `-2/-3/-4px` (`shadow-cartoon-sm`) | `-3/-5/-7px` (`cartoon-surface`, md) |

Two compensating lies that happen to land 30 px apart:

1. The metadata band is **16 px (29%) short** of the band that arrives — the ghost implies a
   smaller type rung than `text-subheading` Fraunces actually occupies.
2. The skeleton draws a **68 px swatch row that never appears**. In Browse the loaded card is
   collapsed (`BrowsePane.vue:92` `:expanded="pm.expandedId.value === palette.slug"`), and
   `PaletteCardSwatches` renders only under `v-if="expanded"` (`PaletteCard.vue:138`).

Net: **+30 px per plate × 4 plates = 120 px of phantom column** that collapses at the exact moment
`BrowsePane.vue:41` promises *"skeleton→content is 'ONE surface, NEW content' … settle into the
wall on the snappy spring instead of a hard v-if POP"*. The morph is a spring over a **25% height
step**. The one thing a skeleton exists to prevent is the one thing this one guarantees.

The swatch sizes reveal the origin of the error: the ghost swatch is `w-12 h-12 sm:w-14 sm:h-14`
(**56 px** measured), which is `ExtractWorkbench.vue:150`'s override
(`swatch-class="w-12 h-12 sm:w-14 sm:h-14"`), **not** `PaletteCard.vue:192`'s default
(`w-9 h-9 sm:w-10 sm:h-10` = 40 px). **The skeleton was drawn to Extract's card and then reused at
Browse**, where the card is a different size *and* has no swatch row at all. It cannot be right in
both seats because it hard-codes one and takes no geometry from its host.

---

### D-5 · **MAJOR** · The stagger — the component's signature idea — is dead. Twelve blocks scan in lockstep.

`:50,60,66,77` compute a five-term stagger clock (`(i-1)*0.12`, `count*0.12+0.1`, `+0.22`,
`+0.34+(i-1)*0.1`). Measured live, all five strip segments and all five swatch ghosts:

```
inlineDelays (the CSS custom property):  ["0s","0.12s","0.24s","0.36s","0.48s"]
delays       (::after animation-delay):  ["0s","0s","0s","0s","0s"]
swDelays     (::after animation-delay):  ["0s","0s","0s","0s","0s"]
segAfterAnim: skeleton-scan-cd03d0b0 | 5s | 0s | infinite
```

Twelve elements, one clock, zero phase. The "plate develops left to right" (`:38`), "develops
after the strip" (`:54`), "the last exposure pass" (`:69`) — three annotations describing a wave
that does not travel. What renders is a single 5-second bar sweeping all twelve boxes
simultaneously: strobing, not developing.

Motion hygiene is otherwise fine (the animated property is `transform`, compositor-only, no layout
thrash) — see §4.

---

### D-6 · **MAJOR** · The "same bones, ONE recipe" sibling contract is false in every measurable dimension.

`ShadowPalette.vue:36-40` and `PaletteCardSkeleton.vue:4-8` both assert the two components are one
plate developing in place through one ink recipe. They are rendered from the same seat
(`ExtractWorkbench.vue:103` vs `:159`, inside the same `<Transition mode="out-in">`), so a user
watching Extract sees them swap. Measured, same viewport, same session:

| | `ShadowPalette` (k=5) | `PaletteCardSkeleton` (count=5) |
|---|---|---|
| plate background | `oklab(0.913295 …)` | `oklab(0.913295 …)` ✓ |
| block ink | **`oklab(0.80872 …)`** — the certified ink | **`rgb(246,243,239)`** — `--muted` |
| ink polarity vs plate | **−0.105 L (darker)** | **+0.052 L (lighter)** |
| strip cell radius | **0 px** | **4 px** |
| swatch radius | **9999 px** (pill) | **4 px** |
| ink ladder | **graded** 100/60/40/30 (`ShadowPalette.vue:104-115`) | **flat** — every block identical |
| strip separation | intended `gap-px` hairlines (`:50`) | unintended 4px-radius notches |

Swapping between them is a visible material change, in the same seat, mid-interaction. And the
flat ink is its own defect independent of the sibling: `ShadowPalette` gives the name block, the
count block and the swatches a **three-step hierarchy** so the ghost reads as an anatomy. The
skeleton gives everything equal weight, so it reads as an undifferentiated pile of boxes.

---

### D-7 · **MAJOR** · The loading register has no terminal arm. A 200 ms wait and an infinite wait look identical.

Enumerated states this component can be in, and what is designed for each:

| State | Handled? |
|---|---|
| in flight, fast (<300 ms) | yes — but see D-14: at Extract it may never paint at all |
| in flight, slow (>5 s) | **no** — zero escalation, zero progress, zero "still working" |
| in flight, stalled forever | **no** — `useImageQuantize.ts:87` sets `isProcessing` true and only `:65`/`:71` clear it; `DEFECT-LEDGER.md:7499` reproduces a decode that leaves the plate ghosted **4 s after a successful decode**, with no failure register |
| failed | **not this component's** — `BrowsePane.vue:59` swaps to `EmptyState variant="error"`; Extract's error line is a bare `<div>` (`ExtractWorkbench.vue:80-85`). The skeleton has no failed arm and no handoff to one |
| empty | correctly excluded (`:23-31`) |
| never-painted | **unhandled** — `DEFECT-LEDGER.md:10440`: a 4000×3000 upload blocks the main thread **517 ms**, and `PaletteCardSkeleton` "never renders" |

VISUAL-CONSTITUTION §4.1 is binding: *"Selected, failed, **pending**, withdrawn and disabled
states are never color-only. Role, accessible name, **state/value** and associated error/status
are explicit."* This component expresses pending as *shape only*, with no state, no value, no
duration, and no route to failure.

---

### D-8 · **MAJOR** · glass-ui already ships the ghost species this component hand-rolls. Owner edict 4.

The thing the ghost swatch stands in for is a `WatercolorDot`
(`PaletteCardSwatches.vue:26` → `SwatchHoverMenu.vue:16,29`). glass-ui's own docblock:

```
node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
 *   `ghost`  — the SAME seeded blob SILHOUETTE traced as a DASHED outline: a …
```

The producer ships, by name, *the ghost of the exact species being ghosted* — the same seeded
silhouette, dashed. `EmptyState` already consumes it (the "dot trio" this component's own comment
cites at `:26-27`). `PaletteCardSkeleton` instead draws a 56 px rectangle whose radius it cannot
even control (D-3), so the loading→loaded transition morphs a **hard square** into an **organic
seeded blob**.

VISUAL-CONSTITUTION §2 names WatercolorDot as one of the two signature ideas of the product. Its
loading state is a grey box.

---

### D-9 · **MAJOR** · The metadata band is a false prediction and an unbalanced composition.

`:55` `px-3 py-2.5 flex items-center gap-2` vs the real band at
`PaletteCard.vue:41` `px-3 py-2.5 flex items-center **justify-between** gap-2 min-w-0`.

The skeleton left-packs a 128 px name block and a 24 px count block and stops. The real row ends
with a `Button icon-only size="sm"` menu trigger at the right edge (`PaletteCard.vue:94-102`).
So:

- optically, **~60% of the ghost band is empty** — it reads as *content missing*, not *content
  loading*;
- structurally, the trailing action affordance materialises out of nothing at handoff;
- PROPORTION-AUDIT §5.6 — *"Add affordance when the surviving action/state is otherwise
  undiscoverable"* — and §5.8 — *"Real rendered relation wins over token intent"* — are both
  answered here by omission.

---

### D-10 · **MAJOR** · In reduced-motion and forced-colors the loading register carries no perceptible signal at all.

Measured live (`page.emulateMedia`), same node, four environments:

| environment | `::after` animation | segment fill | plate shadow | reads as "loading"? |
|---|---|---|---|---|
| default light | `skeleton-scan / 5s / 0s` | `rgb(246,243,239)` | cartoon-sm | weakly (lockstep strobe) |
| default dark | `skeleton-scan / 5s / 0s` | `rgb(31,28,25)` | cartoon-sm | weakly, wrong polarity |
| **`prefers-reduced-motion: reduce`** | **`none / 1e-05s`** | `rgb(246,243,239)` | cartoon-sm | **no** |
| **`forced-colors: active`** | `::after` **`display:none`** | `canvastext` @ **`opacity:.18`** | **`none`** | **no** |

In both accessibility environments the component degrades to **twelve static boxes** — which is
precisely the resting appearance of `ShadowPalette`, the component that means *nothing is
happening*. Loading and empty become the same picture for every reduced-motion and every
high-contrast user.

The source claims otherwise at `:118-119`: *"PRM stillness rides the producer's media query
(parked at the 0.55 trough)"*. There is no trough (D-1); PRM parks at full opacity with no pulse.
The intended graceful degradation — a *static but differentiated* register — was designed and
never built.

VISUAL-CONSTITUTION §6: *"Reduced motion resolves directly to the final geometry and stable
chromatic state."* Resolving to *the empty state's picture* is not that.

---

### D-11 · **MAJOR** · Canon violations on the plate itself.

| Canon | Clause | This component |
|---|---|---|
| VISUAL-CONSTITUTION §3.1 / PROPORTION-AUDIT §5.12 | every palette entity slip uses exactly `{size:"sm", material:"content", tier:"quiet", surface:"opaque", **shadow:false**, grain:false, specular:"off"}` | `:34` `shadow-cartoon-sm` — measured `-2/2/0, -3/3/0, -4/4/0`. A cast shadow on a palette slip |
| VISUAL-CONSTITUTION §7 (Library and Browse) | *"Saved palettes are matte specimen slips inside a glass workspace, **not cartoon casters** stacked within casters"* | the loading plate is a cartoon caster |
| — (internal consistency) | `PaletteCard.vue:16-18`: *"NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip **rasterizes 1-bit at compositing-layer bounds**; the strip clips its OWN corners"* | `:34` `overflow-hidden` **at card level** — the exact technique the loaded arm documents as a rendering defect, applied to the arm that is composited *while animating* |
| VISUAL-CONSTITUTION §7 (Extract) | *"the undeveloped state remains contextual, **not a giant shadow placeholder**"* | see D-12 |
| PROPORTION-AUDIT §5.8 | *"Real rendered relation wins over token intent. … token presence alone cannot close a row"* | the file is built almost entirely on token presence (D-1) |

The elevation also **steps at handoff**: `shadow-cartoon-sm` (−2/−3/−4) → `cartoon-surface` md
(−3/−5/−7). The plate visibly rises when the data lands, on top of the 30 px height jump (D-4).

---

### D-12 · **MINOR (MAJOR at Extract)** · `count` is unbounded and the plate degenerates into the forbidden giant placeholder.

`count` is an unbounded `number` (`:88,93`). `ExtractWorkbench.vue:103-106` threads the live
k-slider straight into it; k's real range is 1…16 (measured `aria-valuemax="16"` on the "Number of
colors" slider). Measured on the geometrically identical sibling (`ShadowPalette`, whose swatch
row declares the byte-identical `px-3 pb-3 flex flex-wrap gap-2` /
`w-12 h-12 sm:w-14 sm:h-14 shrink-0` — so the number transfers):

```
k=5   → plate 150 px,  strip cell 91.2 px,  swatch row  68 px
k=16  → plate 278 px,  strip cell 27.8 px,  swatch row 196 px   (+85%)
```

At k=16 the strip is sixteen 27.8 px cells — and in *this* component each carries a 4px radius
(D-3), so it stops reading as a strip entirely and becomes a row of tic-tacs. The plate becomes a
**278 px shadow slab** dominating the Extract inspector: VISUAL-CONSTITUTION §7 forbids exactly
this. And the dead stagger clock (D-5), were it ever revived as written, would put the last swatch
at `16×0.12 + 0.34 + 15×0.1 = 3.76 s` — a wave that finishes after most fetches do.

---

### D-13 · **MINOR** · Four simultaneous identical `role="status"` regions.

`:35-36` puts `role="status" aria-label="Loading palette"` on **each** plate.
`BrowsePane.vue:49-51` renders `SKELETON_COUNT = 4` (`:207`) of them inside a wrapper that is
*itself* labelled `aria-label="Loading palettes"` (`:48`) but is a plain `<div>` — not a live
region. Prior CDP capture (`DEFECT-LEDGER.md:18252`) shows the resulting AX tree:

```
[{role:"generic",name:"Loading more palettes"},{role:"status",name:"Loading palette"},
 {role:"status",name:"Loading palette"}]
```

Four polite live regions announcing the same three words. The correct design is **one** status
region on the wrapper and `aria-hidden` plates — which is precisely the split `ShadowPalette.vue:41-44`
already reasons through and gets right.

---

### D-14 · **INFO** · No gate in this repository can see any of the above.

- `$ npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0, zero diagnostics.** Vue template
  typing permits arbitrary attributes on a component (they are legal fallthrough), so
  `surface="glass" variant="breath"` on a one-prop component is invisible to the type gate.
- The one e2e oracle, `e2e/smoke/views/browse-loading.spec.ts`, asserts **presence and absence
  only** — `toBeVisible()`, `toHaveCount(0)`, plus "no `svg.animate-spin`". It never asserts ink,
  radius, phase, or that the ghost silhouette matches the card that arrives.

This is the mechanism that let a fully inert design survive four tranches: the file documents
intent in prose, the type gate accepts the fiction, and the visual gate checks that a `div` exists.

---

### D-15 · **MINOR** · Direction-blind motion.

The producer scan is a physical `translate(-110% → 110%)`; the stagger orders by DOM index (`--i`).
Under `dir="rtl"` (probed) every computed value is byte-identical to LTR — the "left to right"
development (`:38`) runs against the reading direction. Currently moot because both mechanisms are
dead (D-1, D-5), but any revival must key on the inline axis.

---

### D-16 · **INFO** · The comment mass is the defect's habitat.

53 of 124 lines (**43%**) are prose. They read as a changelog of eleven waves (S.W5-1, S-10.4,
T.W3-2, T.W6.5/R12, D9, L9, E1-R2, Q4, N-3, D6, §No-workaround) and they assert, in the present
indicative, behaviour that has never executed. Owner edict 1 (no god modules) is about size; this
is its dual — a 124-line file whose *documentation* is the god module. The prose is load-bearing
in the worst way: it is the only place the two registers exist.

---

## 2. State coverage matrix

| State | Designed? | Reality |
|---|---|---|
| empty | n/a — correctly excluded (`:23-31`) | ✓ |
| loading — fast | yes | inverted ink (D-2), lockstep strobe (D-5) |
| loading — slow (>5 s) | **no** | identical to fast; no escalation |
| loading — stalled | **no** | ghost forever (`DEFECT-LEDGER:7499`) |
| loading — never painted | **no** | 517 ms main-thread block hides it (`DEFECT-LEDGER:10440`) |
| error | **no** — handed to a sibling with no visual continuity | plate → `EmptyState` hard swap |
| populated (handoff) | **no** | +30 px / −68 px structural jolt (D-4) |
| disabled / focused / hovered / active / pressed / selected / dragging | n/a (noninteractive) | ✓ — though `cursor` flips `default`→`pointer` at handoff |
| overflowing / truncated | n/a | ✓ |
| **RTL** | **no** | direction-blind (D-15) |
| **reduced-motion** | claimed (`:118`), **not built** | 12 static boxes = the empty picture (D-10) |
| **forced-colors** | **not considered** | `opacity:.18`, no sweep, no shadow — no loading signal (D-10) |
| **zoomed 200%** | ✓ | all geometry is rem-based (`h-10`, `w-32`, `w-12/14`); scales cleanly |
| k = 16 | **no** | 278 px slab (D-12) |
| mobile ≤ sm | partial | 142 px vs 150 px; still predicts a swatch row Browse never shows |

Eight unhandled or falsely-claimed states. **A state that was never designed is a design defect**,
and three of these (reduced-motion, forced-colors, stalled) are states the file explicitly claims
to handle.

---

## 3. Owner-edict compliance

| Edict | Verdict |
|---|---|
| 1 — no god modules | ✓ structurally; ✗ in spirit (D-16) |
| 2 — no legacy code, **no masking fallbacks** | **✗** — `:110-112` and `:120-123` are per-instance overrides of seams that do not exist: fallbacks masking nothing, forever |
| 3 — KISS, no contrivance | **✗** — a `variant` prop, a `computed`, a scoped `<style>`, and a five-term stagger clock, all producing one undifferentiated result |
| 4 — **glass-ui is the design system** | **✗✗** — passes two nonexistent props (D-1) and hand-rolls a ghost species the producer already ships by name (D-8) |
| 5 — root-level styling, never per-instance overrides | **✗** — `[data-slot="palette-card-skeleton"] { --pulse-aura-opacity-max: … }` is a per-instance override, and it overrides nothing |
| 6 — animations never deleted, only moved or tokenized | ✓ nominally; the *effective* deletion happened silently in the producer |
| 7 — idiomatic Vue 3.5 | ✓ reactive props destructure at `:87`; the `computed` is idiomatic but dead |
| 8 — `verbatimModuleSyntax` | ✓ no type-only imports needed |

---

## 4. What is actually sound (the negative proof)

Stated so the report is not read as indiscriminate:

- **Motion property choice is correct.** The animated property is `transform` on a `::after`, with
  `will-change: transform`. No layout-forcing property is animated. Verified in the producer CSS.
- **Reduced motion is honoured at the producer level** — the scan is inside
  `@media (prefers-reduced-motion: no-preference)`, so nothing animates under PRM. (The defect is
  what remains, not that motion persists.)
- **Forced-colors has a producer arm** (`opacity:.18; background:canvastext; ::after{display:none}`).
  Again, the defect is that the demo layer adds no differentiation on top.
- **Zoom to 200% is clean** — every dimension is rem-derived; no px-locked chrome.
- **The AT plumbing on the leaf is right** — glass-ui's Skeleton emits `aria-hidden="true"`
  per block, so only the plate root announces.
- **Vue 3.5 idiom is correct** — reactive props destructure with defaults at `:87`, no
  `withDefaults` boilerplate, no stale-read `defineModel` hazard (no model here).
- **`role="status"` is the right role for this component** (contrast `ShadowPalette`, correctly
  `aria-hidden`); the defect is the *cardinality* (D-13), not the choice.
- **The horizontal-overflow and main-landmark axes are clean** on both host routes —
  `visual/REPORT.md:22,28`: `horizontalOverflow 0`, `mainCountNotOne 0` across all 60 captures.

---

## 5. Reproduction

The Safari matrix at `audit/visual/shots/**` settles at ~3.5 s (`REPORT.md:121,137`), so it
captures the **loaded/error** arms only — the skeleton appears in none of the 60 captures. That is
itself worth recording: *this component has never been in the visual audit*. To pin it:

```js
// playwright, against the live dev server
await page.route('**/palettes*', async r => { await page.waitForTimeout(15000);
  await r.fulfill({status:200, contentType:'application/json',
    headers:{'access-control-allow-origin':'*'},
    body: JSON.stringify({data:[/* 4 palettes, 5 colors each */], nextCursor:null, hasMore:false})}); });
await page.setViewportSize({width:1440,height:900});
await page.goto('http://localhost:9000/#/browse');
await page.waitForSelector('[data-slot="palette-card-skeleton"]');
// then read: root height, children[0].children[0] computed background-color /
// border-radius / ::after animation-{name,duration,delay}, and outerHTML.
```

Repo-native equivalent: `e2e/smoke/fixtures/browse-palettes.ts` →
`routeBrowsePalettesDelayed(page, 6000)`.

For D-12: `/#/extract` → focus the "Number of colors" slider → `End` → measure
`[data-slot="shadow-palette"]`.

**Not a finding (recorded for honesty).** In one reused-page probe the two mid-fetch plates
resolved to `position:fixed` at `(0,−1)` under `<body>` with the Browse pane body empty
(`scratchpad/p3-full-light.png`). I could **not** reproduce this on a clean page and could not
attribute it to any app code. It is a probe artifact until reproduced — recorded as a
**hypothesis**, not a defect. The crop taken from that frame (`skel-crop-light.png`) is still valid
evidence of the component's *own* rendering, which matched the computed values measured in every
other session.

---

## 6. Proposed cure — the gestalt transposition, not a patch

Patching the seams would leave the same file with the same fiction. Three moves, in order:

**1 · Delete both ghosts; make the skeleton an arm of the card.**
`PaletteCardSkeleton.vue` (124) + `ShadowPalette.vue` (115) → **0**. `PaletteCard` gains
`state: "pending" | "empty" | "ready"`. The pending arm renders *the card's own boxes* with a
placeholder fill and no content. The loading→loaded silhouette then matches **by construction**:
D-4, D-6, D-9, D-11's overflow/shadow split and the whole class of hand-copied-geometry drift
become structurally impossible. `DEFECT-LEDGER.md:10044` and `:18707` reached the same conclusion
independently; this seat confirms it from the design side and adds the reason it is not optional:
the two files have *already* drifted into opposite ink polarity and different corner geometry
while both claiming to be one recipe.

**2 · Relay the real seams to glass-ui (BH/BI standing edict).** The producer's Skeleton needs,
minimally: `background: var(--skeleton-bg, var(--muted))`,
`animation-delay: var(--skeleton-delay, 0s)`, and a radius that a consumer class can win
(`border-radius: var(--skeleton-radius, var(--radius-input))`). Until that lands, **the demo must
not write to seams that do not exist** — it must use the one channel glass-ui actually reads
(`class`) or not claim the behaviour. If the two temporal registers are genuinely wanted, they are
a producer `variant`, per edict 4 — not a demo prop that the producer discards.

**3 · Make the ghost of a WatercolorDot a ghost WatercolorDot.** `variant="ghost"` already exists
and already means "the same seeded silhouette, dashed". Consume it, and D-3's swatch radius and
D-8 both disappear.

Then, and only then, add the state coverage §2 lacks: a slow arm, a stalled arm, and a route to
the error register — with the announcement collapsed to one live region on the wrapper.

---

## 7. Strongest single defect

**D-1.** Everything else is downstream of it. The component's two registers, its certified ink,
its stagger and its breath calibration all address an API surface that `@mkbabb/glass-ui@7.0.0`
does not expose. What ships is one undifferentiated register painted in the wrong direction, and
no gate in the repository can tell.

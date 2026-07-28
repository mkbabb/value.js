# CHALLENGE-D · PASS 3 — `demo/palettes/BrowsePane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** This pass contributes **fifteen findings** — three that overturn or narrow a prior
pass's ruling, ten that no prior pass raised, and two corrections to prior measured numbers — plus
**six negative proofs**, one of which kills a claim I had myself half-written before the pixels
refuted it.

The strongest single result of this pass:

> **Pass 2 KILLED the mobile placeholder clip as "a font-loading transient". It is not. It is a
> permanent, post-`fonts.ready`, two-engine geometry defect that appears only on the real mobile
> control rung — the arm pass 2 did not measure. `21px` type in a `217px` box: the field clips its
> own placeholder mid-word, in Chromium (+9.6 px) and WebKit (+10.7 px), stable at t+0 and
> t+3000 ms with `document.fonts.status === "loaded"`.**

The second strongest is new: **the wall's `Retry` and `More from the commons` affordances sit at the
bottom of a scroll host that hides its scrollbar, paints no fade, and slices a colour specimen in
half at its terminus.** At 200 % zoom that host holds **1.5 cards out of 3.8 viewports** of content.

And the third: **the pane throws away the one error species the transport layer went out of its way
to name.** `DevMisconfigError` ships a message ending *"This is a dev-config error, NOT 'backend
offline'"*. `useBrowsePalettes.ts:79` discards it and substitutes the constant
`"Failed to load palettes"`. All **60** captures in the mega-tranche visual audit show the resulting
plate. The audit has been looking at a mislabelled error for its entire run.

**Model observed: Opus 5 (`claude-opus-5[1m]`).**

---

## 1. Provenance and scope of this pass

Two CHALLENGE-D reports already existed at this path:

| file | findings | date |
|---|---|---|
| `./challenge-D-design-pass1.md` | 20 + 11 (Round 2) | 2026-07-27 17:52 |
| `./challenge-D-design-pass2.md` | 26, six BLOCKER | preserved verbatim from the prior `challenge-D-design.md` before this write |

I did **not** re-litigate pass 2's composition family (D-01 Card inversion, D-05/06 the equal-card
matrix, D-11 the clickable `role="article"`, D-16 the Retry blank, D-23 the dark specimen dissolve).
I re-derived several of those independently and **concur**; §5 records the concurrence with my own
coordinates so the finding does not rest on a single seat. This report's body is what pass 2 did not
have, got wrong, or killed on the wrong arm.

Per the seat brief (MT-F022) I have **not** born-RED the 7/12 keyboard figure. The one keyboard
consequence I record (§5, concurrence with pass-2 D-11) is engine-invariant by construction — the
element carries no `tabindex` and no key handler, so no engine can focus it — and it is not a roving
group: my Chromium walk shows every vote chip and every card menu individually tabbable, which is
the opposite of roving.

**Reproduction environment.** Branch `tranche-u`, HEAD `c654824e`.

- **Error arm** — `http://localhost:9000`. The loopback origin latches `detectDevMisconfig`
  (`demo/platform/transport/availability.ts:107–115`), so no request is issued. This is the arm all
  60 audit captures froze.
- **Populated arm** — I stood up a read-only, GET-only CORS mirror of the production API on
  `:9101` (`./probe/p3-D-proxy.mjs`; every mutating verb returns 405, so the probe cannot write to
  the commons) and a second Vite dev server on `:9010` with `VITE_API_URL` set, which clears the
  latch. **This is the first pass to render the wall from real production rows in this seat's
  evidence set.**
- **Operator note, disclosed.** The second Vite instance shares `node_modules/.vite`, and its
  optimiser replaced the `deps` directory out from under the running `:9000` server, which then
  served `504 (Outdated Optimize Dep)`. I detected this, stopped both probe servers, and restarted
  `:9000` exactly as it had been running (`npx vite --port 9000 --strictPort`). Verified recovered:
  `textLen 324` on `/#/browse`. No repository file was touched. Recorded because an undisclosed
  side effect on the owner's dev server would be worse than the finding it bought.

---

## 2. Findings

Severity is against the shipped user-visible surface, not against wave ownership.

### F-A · The mobile control rung was never measured

#### D3-01 · MAJOR — the mobile search field clips its own placeholder mid-word. Two engines. Post-`fonts.ready`. **Pass-2's KILL is overturned.**

Pass 2 recorded:

> *"**KILLED** — Chromium 390 px: text 151.0 px vs 236.0 px available. WebKit 390 px: 151.1 vs
> 235.0. **Fits, in both engines, with 36 % slack.** … it is a font-loading transient, not a geometry
> defect of the field."*

Those two numbers are reproducible — on a **bare 390 px viewport**, which does not activate the
mobile control rung. Measured on both arms, both engines, after `await document.fonts.ready`
(`./probe/p3-D-ph.mjs`):

| engine | arm | computed font | placeholder | available | overflow |
|---|---|---|---:|---:|---:|
| chromium | `devices["iPhone 14"]` | **21 px** Plus Jakarta Sans | 226.6 | 217.0 | **+9.6 CLIPPED** |
| chromium | bare `390×844` | 14 px | 151.0 | 236.0 | −85.0 fits |
| webkit | `devices["iPhone 14"]` | **21 px** | 226.7 | 216.0 | **+10.7 CLIPPED** |
| webkit | bare `390×844` | 14 px | 151.1 | 236.0 | −84.9 fits |

`fontsReady: "loaded"` in all eight rows; identical at `t+0 ms` and `t+3000 ms`. The transient
hypothesis predicts convergence over time — there is none. The bar is `54 px` tall on the device arm
and `36 px` on the bare arm, which is the independent tell that the two arms are different type
rungs, not different moments.

`text-overflow` computes to `clip`, so the glyph run is severed mid-word with no ellipsis:
**"Search the common"** + a sliver of the `s`.

The mega-tranche's own capture harness uses the device descriptor
(`audit/visual/capture.mjs` → `devices["iPhone 14"]`), which is why
`shots/safari-mobile-light/browse.png` and `shots/rtl-mobile/browse.png` both show the clip at
settle. Pass 2's counter-measurement and the audit's own screenshot disagreed; the screenshot was
right.

**Evidence:** `./evidence/D-p3-mobile-placeholder-clip.png` (crop of the audit's own WebKit capture).

**Mechanism.** `BrowsePane.vue:13` authors a 21-character placeholder for a field whose mobile
inline measure is 217 px, while `BrowsePane.vue:15–26` injects `SearchFilterBar` into glass-ui
`SearchBar`'s default slot — a 44 px trailing control the input's `flex:1 min-w-0` correctly yields
to. The pane composed a field with a trailing slot and did not re-measure its own copy against the
result.

**Cure.** Not a shorter string bolted on. The placeholder is the field's *only* visible label
(`aria-label` is absent — §2 F-C below), so shortening it degrades the label. The gestalt cure is to
give the field a real label and let the placeholder become an example: `SearchBar` gains a producer
`label` affordance (its sibling `FuzzySearch` already ships `ariaLabel`; `SearchBar` does not —
`node_modules/@mkbabb/glass-ui/dist/search.js`, `SearchBar` props: `modelValue, placeholder, icon,
tag, size, surface, variant`). Until then, `::placeholder { text-overflow: ellipsis }` at the
producer root is the honest interim, because a severed word is worse than an elided one.

---

#### D3-02 · MAJOR — the filter trigger is a deformed control: a per-instance override that half-lands. **Pass-2's D-22 number is wrong.**

Pass 2 states *"`SearchFilterBar.vue:5` is one of them (`h-8 w-8` = 32 × 32)"*. Measured
(`./probe/p3-D-fine.mjs`, Chromium 1440×900, populated arm):

```
btnClass : "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover relative h-8 w-8"
computed : height 40px · width 32px · min-height 40px · min-width 0px · border-radius 9999px
rect     : 32 × 40   (aspect 0.800)
bar      : height 36 · top 208.7 · bottom 244.7
button   : top 206.7 · bottom 246.7
overhangTop 2 · overhangBottom 2
```

The control is **32 × 40, not 32 × 32.** The consumer's `w-8` lands because the producer sets
`min-width: 0`; the consumer's `h-8` **loses** to the producer's `min-height: 40px`. The result is
a `border-radius: 9999px` element at aspect 0.8 — a visible **ellipse, not a circle** — seated in a
**36 px** bar, overhanging it by **2 px at the top and 2 px at the bottom**.

This is the exact harm owner edict 5 names ("style at the root, never per-instance overrides"): the
override does not simply fail, it *half* succeeds, and the half that succeeds is the one that
deforms the glyph. `PROPORTION-AUDIT.md §5.7` — *"Visual glyph size, operable target size and layout
reservation are separate quantities"* — is violated in the worst direction: one class was asked to
set all three and set one.

Visible at every scale; unmissable at 200 % zoom.
**Evidence:** `./evidence/D-p3-filter-trigger-overhang.png` — the blister protruding past the field's
rounded cap, top and bottom, from the audit's own `zoom-200-desktop/browse.png`.

**Cure.** Delete `relative h-8 w-8` from `SearchFilterBar.vue:5` and consume a producer `size` rung
on `Button`. If no rung is 32 px tall, that is the glass-ui ask — not a consumer class.

---

#### D3-03 · MINOR — the field's visible chrome is 36 px; its operable target is 24.6 px

```
barH 36 · inputH 24.6 · deadBandTop 5.7 · deadBandBottom 5.7
elementFromPoint(bar.centerX, bar.top + 3) → div.input-bar
click at bar.top + 3 → document.activeElement === BODY
```

`.input-bar` is a `<div>`, not a `<label>`, so **32 % of the field's visible height (11.4 / 36 px) is
dead to the pointer** — clicking the top or bottom sixth of a control that looks entirely like a text
field does nothing at all. Same law as D3-02: glyph size, target size and reservation are three
quantities and here two of them disagree by 11.4 px.

**Cure.** The producer's `SearchBar` root becomes a `<label>` (or the input takes
`position:absolute; inset:0` inside a positioned root). Root-level, one edit, all three consumers.

---

### F-B · The wall's scroll terminus

#### D3-04 · MAJOR — a scroll host named `pane-scroll-fade` that paints no fade, hides its scrollbar, and slices a specimen in half. **Pass-2's KILL narrowed and re-raised.**

Pass 2 killed the pass-1 claim with: *"`PaneHeader.vue:54–57` defines `scroll-timeline:
--pane-scroll block`; the header's `::before` veil is its consumer. The fade exists."*

That answers a different question. The header veil is a **top-edge** material that swells on scroll.
The defect is the **bottom terminus of the scroll host itself**. Measured on the host element
(`./probe/p3-D-fine.mjs`):

```
.pane-scroll-fade  maskImage: none   webkitMaskImage: none
                   ::before background: rgba(0,0,0,0) none     (no gradient)
                   ::after  background: url("data:image/svg+xml,…")   (the grain texture, not a fade)
                   overflowY: auto   scrollbarWidth: none
                   scrollHeight 1289 / clientHeight 772        → 517 px hidden
```

So: **517 px of content below the fold, a hidden scrollbar, no mask, no gradient, no cue.** The
rendered consequence is in `./evidence/D-p3-wall-desktop-light.png` — the sixth card's colour
specimen is severed by a hard horizontal edge at the pane's bottom, which reads as a paint bug, not
as "there is more".

At 200 % zoom (`720×450 @2`, the WCAG 1.4.4 arm the audit already runs):

```
scrollHeight 1275 / clientHeight 336   → 3.79 viewports of content in the host
rendered: 1.5 cards visible
```

`./evidence/D-p3-wall-zoom200.png`. A discovery wall that shows one and a half specimens at 200 %
zoom is not a discovery wall. `VISUAL-CONSTITUTION.md §3.6` requires mobile to be *"one
document-scrolling stage"*; the reflow arm inherits a nested `h-full` scroller instead
(`BrowsePane.vue:2` — `overflow-y-auto … h-full`).

**Cure.** The field does not own a scroll host at all once §3.1's *"the field … [has] none"* is
honoured: the document scrolls, the chassis region grows, and the terminus problem dissolves. Until
then the host owes a bottom mask and a visible scrollbar — the class already claims the former by
name.

---

### F-C · States and errors that were never designed

#### D3-05 · BLOCKER — the pane discards the one error species the transport designed

`demo/platform/transport/availability.ts:120–130` builds this message and throws it as a distinctly
named `DevMisconfigError`:

> *"value.js dev is MISCONFIGURED: … whose CORS allow-list excludes localhost — every palette
> request will be blocked. Run `npm run dev` … or set `VITE_API_URL` … **This is a dev-config error,
> NOT "backend offline"**."*

`markApiUnreachable()` even refuses to downgrade it: *"A designed misconfig is NOT an unreachable
backend — never mislabel it."*

`demo/palettes/useBrowsePalettes.ts:74–80`:

```js
} catch (e) {
    if (gen !== loadGeneration) return;
    browseError.value = "Failed to load palettes";   // <- `e` is discarded here
    …
    console.warn("Failed to load remote palettes:", e);
}
```

`BrowsePane.vue:62–66` then renders it:

```
message = "The commons is unreachable."     ← a claim about the backend
detail  = pm.browseError                     ← "Failed to load palettes"
```

`EmptyState.vue:10–13` documents the `detail` rung as *"**the machine truth** in Fira"*. It receives
a hand-written constant. The rung carries **zero** information beyond the headline — it is a
decorative second line wearing a mono voice that signals provenance it does not have.

The severity is not hypothetical: **every one of the 60 captures in
`audit/visual/REPORT.md` renders this exact plate.** The mega-tranche's whole visual evidence base
has been reading "the commons is unreachable" where the truth was "this dev server is pointed at the
wrong origin". `REPORT.md` records `consoleErrors` for `/#/browse` as **0** in all four matrices,
because the diagnostic is a `console.error` emitted at module init before the harness attaches — so
the one signal that would have caught it was invisible to the harness too.

**Cure.** Errors are entities, not strings. `browseError` becomes the caught error, and the plate
switches on its type: `DevMisconfigError` → a configuration plate with the actionable remedy;
`ApiUnavailableError` → the unreachable plate; `ApiProblem` → title + `detail` from the
`problem+json` the transport already parses (`client.ts:118–124`). One `catch` stops flattening
three species into one lie.

---

#### D3-06 · BLOCKER — the colour-search affordance is dead against production data

`BrowsePane.vue:339–349`:

```ts
return palettes.filter((p: any) => {
    const oklabColors = p.oklabColors as { L: number; a: number; b: number }[] | undefined;
    if (!oklabColors || oklabColors.length === 0) return false;   // ← excluded, not skipped
    return oklabColors.some((c) => Math.hypot(c.L - L, c.a - a, c.b - b) <= radius);
});
```

Measured against the live production wall:

```
$ curl -s "https://api.color.babb.dev/palettes?limit=50"
rows 10  hasMore False
oklabColors EMPTY: 5 of 10
  hey-v2-…-remix-fe 0 · hey-v2-…-remix-2a 0 · hey-v2-cd3e1e3b 0 · hey-7600d315 0 · audit-test-… 0
  lavender-dreams 4 · forest-canopy 7 · neon-cyberpunk 5 · ocean-depths 6 · sunset-blaze 5
```

**Half of the shipped commons is unreachable by colour search by construction** — a palette whose
index the backend never computed is not "unmatched", it is *deleted from the result set*, silently,
for a filter the user believes is about colour.

Two further design decisions compound it. `BrowsePane.vue:353–354` declines the server-side filter
the API already supports (`listPalettes` accepts `colorL/colorA/colorB/colorRadius`,
`api/palettes.ts:26–29`) with the comment *"client-side is instant"* — so the search also only ever
sees the **first 50 loaded rows**, never the commons. And `radius = 0.15` (`:343`) is an
undocumented magic constant in OKLab units with no user control and no visible indication of what it
means.

When it returns nothing, it returns nothing into D3-07's lying empty plate.

**Cure.** Colour search is a server query, not a client array filter. Route it through the port with
the other four filters (see D3-10), and let a row with no index be *ranked last*, never dropped.

---

#### D3-07 · BLOCKER — filtered-to-zero is not empty, and the plate says the opposite. Reproduced.

`BrowsePane.vue:83–86` renders the true-empty invitation whenever `displayedBrowse.length === 0`,
unconditionally on filter state:

```
empty-eyebrow "· the commons ·"
empty-text    "No published palettes here yet."
empty-hint    "Publish one from My Palettes and start the wall."
```

Reproduced live on the populated arm (`./probe/p3-D-wall.mjs`): with **ten** published palettes
loaded, typing `zzzzqqqqxxxx` into the field yields

```
"Browse Discover palettes from the community. · THE COMMONS ·
 No published palettes here yet. Publish one from My Palettes and start the wall."
statusRole: true   loadMoreVisible: false
```

`./evidence/D-p3-filtered-zero.png`.

Two lies in one plate: the commons **does** have published palettes, and the remedy offered
(*publish one*) is not the user's problem and will not change the result. `EmptyState.vue:2–13`
declares exactly two species — *"loading ≠ empty, error ≠ empty"* — and the third species the wall
actually produces, **no-results-for-your-filters**, was never designed. A state that was never
designed is a design defect; this one also emits false guidance.

**Cure.** The wall has four terminal states, not three: `loading | error | empty | no-match`. The
`no-match` plate names the constraint that produced it and offers the only useful action — clear it.
`SearchFilterBar` already computes `activeFilterCount`; the pane already owns `searchQuery`. The
predicate exists; nobody wrote the branch.

---

#### D3-08 · MAJOR — the developing plate depicts a card that never arrives, and under-reserves the wall by 42 %

`BrowsePane.vue:30–39` claims the design intent verbatim:

> *"skeleton→content is 'ONE surface, NEW content' … the developing plates SETTLE into the wall on
> the snappy spring instead of a hard v-if POP"*

Measured through a held response (`./probe/p3-D-morph.mjs`, `/palettes` delayed 4.5 s, rAF sampling
of the state container):

```
t=4318…4810 ms   stateBox 648 px   skeleton nodes 52   gridChildren −1
t=8460 ms        stateBox 1120 px  skeleton nodes  0   gridChildren 10
```

- **648 → 1120 px in one step.** A **+472 px (+73 %) jump**, no intermediate frame in a 60 Hz
  sample. `mode="out-in"` (`:40`) guarantees it: the outgoing state is fully removed before the
  incoming one mounts, so the container's height is never interpolated.
- **Per-plate geometry is inverted.** Skeleton: `(648 − 3×12) / 4 = 153 px` per plate. Real card:
  `(1120 − 9×12) / 10 = 101.2 px`. The stand-in is **51 % taller** than the thing it stands for,
  while `SKELETON_COUNT = 4` (`:207`) reserves **58 %** of a 10-card wall — and the page size is
  **50** (`BROWSE_PAGE_SIZE`), so at a full page it reserves 12 %.
- **The anatomy differs.** `./evidence/D-p3-skeleton-phase.png` — the plate has **three** bands: a
  5-cell strip, a title row, and a **5-cell swatch row that the real card does not have**
  (`./evidence/D-p3-wall-desktop-light.png` — strip + identity row, two bands). The skeleton is not
  a low-fidelity picture of the card; it is a picture of a different card.

The sharpest part: **the `vj-morph` family ships the cure and this site declines it.**
`demo/styles/animations.css:104–136` gives the family an optional height morph via
`--vj-morph-collapse` / `--vj-morph-expanded`; both are unset at this site, so `max-height` computes
`none` at every keyframe and the height leg is inert. Pass 2 observed the same unset knob and filed
it as a *negative proof* (no layout-forcing transition). It is that — and it is also the mechanism
of the pop the file's own comment claims to have cured. Both readings are true; only one is a
finding.

**Cure.** Either set the family's two height variables so the box interpolates, or — better and
simpler — stop swapping surfaces: keep one grid, let the skeletons be its children, and let cards
replace them in place. That is what *"ONE surface, NEW content"* actually means, and it makes
`SKELETON_COUNT` a real reservation instead of a decoration.

---

#### D3-09 · MINOR — the pagination affordance is outside the transition it claims to belong to

`BrowsePane.vue:121–124` claims *"The next page arrives as developing plates (the W5-1 grammar)"*.
The load-more block (`:125–144`) sits **outside** the `<Transition>` that closes at `:119`. So the
initial load morphs and the paged load hard-swaps a 36 px button for two 153 px plates — a **270 px
unanimated jump** at the exact moment the user's eye is at the bottom of the list. One wall, two
motion grammars, the inconsistent one on the more frequent event.

---

### F-D · State that lives in the wrong place

#### D3-10 · MAJOR — one filter of five lives outside the port, and it is the one that is broken

Four filters live in the shared port and flow through `pm.filteredBrowse`:
`searchQuery` `:11`, `sortMode` `:16`, `tierFilter` `:17`, `selectedTags` `:18`.
The fifth, colour, lives **pane-locally** at `:336` (`colorSearchParams`) and is applied by a second,
private filter pass at `:339–349`.

That split is the direct cause of D3-06 (a client-side pass over the loaded page cannot use the
server predicate) and it produces a **second** split inside `SearchFilterBar`: the child keeps its
own `colorSearchActive` ref (`SearchFilterBar.vue:170`) purely to render the filter-count badge,
because the real state is in the parent and the parent never tells it. Two components hold two
representations of one filter; only one of them can be right after any path that touches only the
other. `BrowsePane.onClearFilters()` `:329–332` clears the parent's copy — the child's
`colorSearchActive` is reset only by the child's own `onClearAll` `:227`.

Also: `activeFilterCount` (`SearchFilterBar.vue:186–192`) counts `tier`, `selectedTags` and
`colorSearchActive` — **but not `sort` and not the text query**. Change the sort to *Most Forked* and
the badge stays absent; §5.1's *"changed result count/state through the owning status region"* has
no region, and now the trigger has no badge either.

**Cure.** Five filters, one home: the port. The pane emits, the port decides, the badge reads one
source.

---

#### D3-11 · MINOR — the card-ref map only ever grows, and can deliver feedback to a dead component

`BrowsePane.vue:94` and `:209`:

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
…
:ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

Vue invokes a function ref with `null` on unmount. The `el &&` guard **skips the delete**, so the map
retains every `PaletteCard` instance the wall has ever rendered — across sorts, filters, searches and
route re-entries. Two consequences, one of which is a design consequence:

1. `cardRefs[palette.slug]?.showFeedback(...)` (`:229`, `:238`, `:249`, `:264`) can resolve to a
   **detached** instance after a re-sort, in which case the save/delete/visibility/fork verdict is
   rendered into a component that is not in the document. The user's action reports nothing. That
   verdict is the *only* channel these operations have (see §5, concurrence with `VISUAL-CONSTITUTION
   §5`'s *"never carries the only truth"*), so a dropped feedback is a dropped outcome.
2. `reactive()` deep-proxies component instances — every nested property of every retained instance.
   Owner edict 7 asks for `useTemplateRef` / `shallowRef` idiom; this is neither.

**Cure.** `const cardRefs = new Map()` with an explicit `el ? set : delete`, or — after the §3.1
inspector exists — no card refs at all, because durable operation state belongs to the inspector.

---

#### D3-12 · MINOR — a masking coercion for a wire-shape lie, documented in place

`BrowsePane.vue:213–220`:

```ts
// X9: coerce to an Array. `allTags` is typed `Tag[]` but the `/colors/tags`
// read can resolve an object-shaped payload …
const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
return Array.isArray(tags) ? tags : Object.values(tags);
```

Owner edict 2 forbids masking fallbacks. This one is a double cast that widens a declared type in
order to reach a branch the type says is impossible, then silently manufactures tags out of whatever
shape arrived. The comment is honest about all of it. Honesty is not a cure: the payload shape is the
API's contract, and it is being repaired at the last consumer, three layers from the seam.

---

### F-E · Direction and copy

#### D3-13 · MINOR — the error headline's authored full stop jumps to the head of the line under RTL

`shots/rtl-desktop/browse.png` renders **".The commons is unreachable"**. The trailing `.` of
`BrowsePane.vue:65`'s `message="The commons is unreachable."` is a bidi-neutral run at the end of an
LTR run inside an RTL paragraph, so it resolves to the paragraph direction and is laid out at the
visual left. The twin pane shows the same artefact (".No saved palettes yet", ".Save, organize, and
share your colors").

`VISUAL-CONSTITUTION §5.2` governs direction; `REPORT.md`'s `horizontalOverflow` bucket is empty and
`STATES.json` shows `overflowX 0` in both RTL matrices, so the mirroring itself is sound — this is the
one direction defect the mechanical check cannot see.

**Cure.** `dir="auto"` (or `unicode-bidi: plaintext`) on `EmptyState`'s two text nodes — a root-level
edit that fixes all eight consumers at once. Not per-string punctuation surgery.

---

### F-F · Composition of the wall itself, from the first populated render in this seat

#### D3-14 · MAJOR — the wall has no scale, no separators, and six equal protagonists

`./evidence/D-p3-wall-desktop-light.png` is the first populated Browse wall in this seat's evidence.
Read as a design:

- **Nowhere does the wall say how many palettes it holds.** No count, no "10 of 10", no end-of-list
  mark. The only signal that the list has ended is that scrolling stops — inside a host with no
  scrollbar (D3-04).
- **Every card's specimen strip is full-strength, full-bleed, and identically sized regardless of how
  much colour it carries.** A one-colour palette gets the same 50 px band as a seven-colour palette.
  `PROPORTION-AUDIT.md §3.8`: *"One pane may have one full-strength visual protagonist. Supporting
  fixtures do not compete with it through equal size or equal shadow."* Six stacked equals is six
  protagonists.
- **Two ellipsis species, one column.** The pane filter is a **vertical** ellipsis
  (`SearchFilterBar.vue:6`, `EllipsisVertical`); each card's menu is a **horizontal** ellipsis. Two
  glyphs, two orientations, two meanings, 40 px apart. `PROPORTION-AUDIT.md §4 PR-16` asks for one
  named menu purpose per `…`, not two dialects of the same mark.

---

#### D3-15 · MINOR — the sort-pending wash is a per-instance string injected into a design-system root

`BrowsePane.vue:87–90`:

```
:grid-class="'transition-opacity duration-fast ' + (pm.sortLoading.value ? 'opacity-50' : '')"
```

Measured on the rendered grid:

```
class: "palette-card-grid grid grid-cols-1 gap-3 min-h-[120px] transition-opacity duration-fast"
pointerEvents: auto
```

Two defects in four tokens. (a) The pane passes **styling as a string prop** into
`PaletteCardGrid`'s root — precisely the per-instance override edict 5 forbids; the pending register
belongs to the grid as a prop with meaning (`pending`), not as a class the caller concatenates.
(b) `opacity-50` with `pointer-events: auto` renders a wall that **reads disabled and is fully
interactive** — the user can click a card that is about to be replaced by the arriving sort. Colour
alone carries the state, which `VISUAL-CONSTITUTION §4.1` forbids outright: *"Selected, failed,
pending, withdrawn and disabled states are never color-only."*

Pass 2 raised (b) as D-19; (a) — that the mechanism is a stringly-typed style prop crossing the
design-system boundary — is this pass's addition.

---

## 3. Correction of my own prior reading — recorded so it cannot be repeated

I nearly filed a BLOCKER that the seated search field has **no focus indicator**. The first
measurement supported it: focused, `.search-seated`'s computed `box-shadow` gained two layers of
`oklab(0 0 0 / 0) 0px 0px 0px 0px` — transparent, zero-sized. The token itself was well-formed, so
this looked like `.search-seated:focus-within`'s composition
(`utils.css:143–145`) resolving to nothing.

The pixels refuted it. Blur-vs-focus screenshot difference over the field
(`./probe/p3-D-ring4.mjs`):

```
diff bbox (6,0,484,63)   max channel delta 68   pixels differing > 8: 2019
ring perimeter of a 462×36 box at 2 px ≈ 1992 px
```

**The ring paints.** The two null layers were a mid-transition serialisation: `.input-bar` carries
`transition: box-shadow var(--duration-fast)`, and I sampled computed style in the same tick as
`.focus()`. Recorded as a standing trap: *a computed `box-shadow` read inside a transitioning
element's first frame is not that element's resting or settled style.*

---

## 4. Negative proofs — attacked, and could not break

1. **The seated field's focus ring composes and paints.** §3 above. `--focus-ring-shadow` resolves
   correctly on the bar (`0 0 0 2px color-mix(…30%…), 0 0 8px color-mix(…15%…)`), and the unlayered
   `.search-seated:focus-within` correctly *composes* rather than replaces the cartoon stamp — the
   comment at `utils.css:140–142` explains exactly why, and it works.
2. **Reduced motion is honoured at this site.** Under `reducedMotion: "reduce"`,
   `.vj-morph-enter-active` computes `transition-duration: 0.1s`, `animation-name: none`; and
   `STATES.json` records `rafPer1500ms: 0` for `/#/browse` against **270** at rest — the renderer
   loop actually stops, which `getAnimations()` cannot see (the MT-F022 instrumentation earned this).
3. **No horizontal overflow anywhere, including RTL.** `overflowX: 0` in all six state matrices and
   all four Safari matrices; `clipped: []` in every one. My own probes at 1440, 390, 320 and the
   200 % arm reproduce `overflowX 0`. I tried to produce one and could not. The corrected state
   matrix given to this seat is accurate.
4. **`verbatimModuleSyntax` is honoured.** `BrowsePane.vue:197` — `import type { Palette, Tag }`.
   No mixed type/value import in the file.
5. **No duplicate tag fetch on route entry.** Entering `/#/browse` issues exactly one API request:
   `/palettes?limit=50&sort=newest`. `onMounted(() => pm.tagEdit.loadAllTags())` (`:222–224`) did not
   produce a second read — the shared port's catalog is already resolved. A plausible-looking
   duplicate-fetch finding, killed by measurement.
6. **Motion is tokenized, and no animation is deleted.** BrowsePane defines no local keyframes,
   removes none, and names only producer tokens (`duration-fast`, the `vj-morph` family). Owner
   edict 6 holds.

### Hypothesis (labelled — no reproduction I trust)

- **H3-1 · the dark plate may violate the neutral-pole law.** Sampled from
  `./evidence/D-p3-wall-desktop-dark.png`: the Browse card body is `rgb(66,55,47)` — hue 25°, **HSV
  saturation 28.8 %** — against `rgb(233,225,217)` — hue 30°, **6.9 %** — in light. The dark
  structural plate is ~4× more chromatic than the light one, which reads against
  `VISUAL-CONSTITUTION §2` (*"Dark chrome uses the restrained neutral pole. Seed tint is forbidden
  outside the ambient field…"*). **But** HSV saturation on a translucent surface composited over a
  live chromatic aurora is not a measure of the surface's own tint, and pass 2's H-2 already flags
  that the captured ambient field is seed-dependent, not scheme-dependent. A real finding needs the
  plate's own `background-color` token sampled against a neutral ground, in two seeds. Not claimed.

---

## 5. Concurrence with pass 2 — independently re-derived, with my coordinates

I did not re-report these. I record that I reached them separately, so they no longer rest on one
seat.

| pass-2 finding | my independent coordinate |
|---|---|
| **D-01** the field wears the `Card` shell §3.1 forbids | `BrowsePane.vue:2` is `<Card tier="resting">`; §3.1's Browse row: *"browse workspace chassis; every rendered bounded palette entity slip has exactly one Card shell, and **the field/empty/inspector have none**"* |
| **D-05 / D-06** the equal-card matrix, no inspector | measured `paneRect.w = 512` at viewport 1440 → **35.6 %** where §3.1 says 64–66.7 %; the companion `My Palettes` occupies another 35.6 % **while empty**, against §3.2's *"at most a narrow invitation tray (≤15 %)"* |
| **D-11** the card is a clickable `role="article"`, keyboard-unreachable | `PaletteCard.vue:5–25` — `<div role="article" … cursor-pointer @click>`, no `tabindex`, no key handler. My Chromium tab walk: **25 stops inside the pane, none of them a card**; only `"n votes, click to vote"` and `"Palette menu"` per row. §5 names the anti-pattern verbatim: *"A palette card is a bounded entity article, **not a clickable `role=article`**"*. Engine-invariant; not roving tabindex (every chip is individually tabbable, which is the opposite of roving) |
| **D-12** `role="list"` with `role="article"` children | measured `gridRole: "list"`, children `role="article"` — a list AT reports with zero items |
| **D-20** no status region | measured `liveRegions: []`, `ariaBusy: 0`, `resultCountAnnounced: null` on the populated wall. Both loading blocks (`:47`, `:128`) are role-less `<div>`s carrying only `aria-label`, which the accname computation does not expose on a generic element |
| **D-23** the dark specimen dissolves into its stage | same specimen `rgb(36,31,31)`: **12.58 : 1** against the light card body, **1.41 : 1** against the dark one. (Pass 2 correctly notes luminance contrast mis-scores chromatic pairs; for a near-neutral pair like this one it is serviceable, and it agrees with their OKLab ΔE.) |
| **D-14 / §5 omnibus** | `BrowsePane.vue:102–116` wires **twelve** action verbs plus `expanded` onto the card. §5: *"The card body owns no expand, inline rename, action menu, transient result or hover-only swatch-action path."* All five are present |

---

## 6. The gestalt cure this pass adds

Pass 2's four transpositions stand. This pass adds two that are independent of them and can land
first, because they need no chassis:

**A. Errors and empties become typed states, not strings.**
`browseError` carries the caught error; the plate switches on species (D3-05). The wall's terminal
state set grows from three to four so `no-match` stops impersonating `empty` (D3-07). Colour search
becomes the port's fifth filter and a server predicate, so a palette with no index is ranked, not
deleted (D3-06, D3-10). One `catch`, one predicate, one home — and three BLOCKERs close together
because they are one mechanism: *the pane flattens distinct truths into one presentation.*

**B. The three field defects are one producer ask, not three consumer patches.**
D3-01 (no label, so the placeholder must carry the label and cannot fit), D3-02 (a consumer size
class half-losing to a producer `min-height`), and D3-03 (a `<div>` root, so the chrome and the
target disagree by 11.4 px) are all the same shape: **glass-ui's `SearchBar` is missing the API its
own sibling `FuzzySearch` already has.** `FuzzySearch` ships `ariaLabel` and sizes its slot
children; `SearchBar` ships neither. The ask is one producer variant — the already-booked ASK-D
`variant="seated"` — carrying a label affordance, a `<label>` root, and a sized trailing slot.
Three consumers (`BrowsePane:12`, `PalettesPane:35`, `AdminPane:14`) stop hand-rolling on the day it
lands.

---

## 7. Evidence index

| Artifact | What it establishes |
|---|---|
| `./probe/p3-D-ph.mjs` | **the placeholder clip, two engines × two arms, post-`fonts.ready`** — overturns pass-2's KILL |
| `./probe/p3-D-fine.mjs` | filter-trigger 32×40 + 2 px overhang; the 5.7 px dead bands; `pane-scroll-fade` mask/scrollbar; `liveRegions: []`; one API request per route entry |
| `./probe/p3-D-morph.mjs` | the 648 → 1120 px out-in step, plate-vs-card geometry |
| `./probe/p3-D-wall.mjs` | the populated wall in light/dark/mobile/200 %; the filtered-to-zero reproduction |
| `./probe/p3-D-browse-probe.mjs` | the error arm at 1440 / 390 / 200 % / 320 |
| `./probe/p3-D-focus.mjs` | the 25-stop Chromium tab walk; no card-level stop |
| `./probe/p3-D-ring4.mjs` | the focus-ring pixel proof (2019 px) that killed my own draft finding |
| `./probe/p3-D-proxy.mjs` | the GET-only CORS mirror used to reach the populated arm |
| `./evidence/D-p3-wall-desktop-light.png` · `-dark.png` | the wall from real production rows, both schemes |
| `./evidence/D-p3-skeleton-phase.png` | the three-band developing plate vs the two-band card |
| `./evidence/D-p3-wall-zoom200.png` | 1.5 cards in 3.79 viewports |
| `./evidence/D-p3-filtered-zero.png` | the empty plate lying over ten published palettes |
| `./evidence/D-p3-mobile-placeholder-clip.png` | the severed placeholder, from the audit's own WebKit capture |
| `./evidence/D-p3-filter-trigger-overhang.png` | the ellipse overhanging its 36 px bar |
| `./challenge-D-design-pass2.md` | the prior pass, preserved verbatim |

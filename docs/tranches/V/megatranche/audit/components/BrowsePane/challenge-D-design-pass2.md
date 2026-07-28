# CHALLENGE-D · PASS 2 — `demo/palettes/BrowsePane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Twenty-six findings across seven mechanism families; six BLOCKER (D-01, D-05,
D-06, D-11, D-13, D-16).

The pane is not "a good composition with bugs". It is the composition
`VISUAL-CONSTITUTION.md §3.1` names by hand and rules out — *"Resizing the old equal-card matrix
cannot satisfy any member"* — and it is built with the design system's housing primitive attached
to the wrong element. The single sentence that explains the most defects:

> **The `Card` shell is on the field, and the entity slip has none. §3.1 requires the exact
> opposite.**

Everything downstream follows from that inversion: the field cannot content-hug when empty
(`h-full` on a Card), the entity has to hand-roll a cartoon surface (so it casts light from the
opposite direction to its own parent), the entity has no `Card` selection contract (so it became a
clickable `role="article"` reachable by no keyboard in either engine), and the 33.3–36% inspector
the constitution requires was never built at all — its half of the stage is occupied by a
*different route's pane, in its empty state.*

Beneath the composition sit two states that were never designed. One click on the pane's own
**Retry** button permanently destroys the pane body — **reproduced in Chromium AND WebKit**, clean
page, 6-second tail, terminal residue 12 px. And on mobile the presence of a `Featured` badge
crushes the palette's name — the card's protagonist — to a **5.6 px** column of clipped glyph
stubs, confirmed in both engines.

**Model observed: Opus 5 (`claude-opus-5[1m]`).**

---

## 1. Provenance — a pass-1 seat had already run this axis

A prior CHALLENGE-D report existed at this path (written 2026-07-27 17:52, 20 findings + an
11-finding Round 2). It is preserved verbatim at **`./challenge-D-design-pass1.md`**. This pass 2
was spawned with a *corrected state matrix* (text = 280 @ 1440 desktop, 124 @ mobile, 12 operable
controls, `overflowX = 0` in every matrix including RTL, keyboard reachability 7/12 in Chromium
being largely roving tabindex — **correct**, and not to be born-RED without a two-engine proof,
MT-F022).

I re-ran every load-bearing claim from scratch. §4 below records what I **confirmed**, what I
**corrected**, and what I **killed** — three pass-1 findings did not survive measurement.

---

## 2. Evidence apparatus

| Source | Use |
|---|---|
| `demo/palettes/BrowsePane.vue` (360 lines) | full read, line-cited |
| `demo/palettes/browser/card/PaletteCard/PaletteCard.vue`, `PaletteCardGrid.vue`, `PaletteColorStrip.vue`, `demo/shared/ui/EmptyState.vue`, `PaneHeader.vue`, `browser/search/SearchFilterBar.vue`, `demo/styles/utils.css`, `animations.css`, `demo/shell/viewSchema.ts`, `usePaneRouter.ts` | the composition's real coordinates |
| `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md` | binding law; quoted verbatim |
| `.../audit/visual/REPORT.md`, `REPORT.json`, `STATES.json` | the six `/#/browse` capture rows |
| `.../audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,rtl-mobile,forced-colors-desktop,zoom-200-desktop,keyboard-focus-desktop}/browse.png` | read as images |
| `./probe-D-design.mjs`, `./probe-D2-states.mjs`, `./probe-D3-retry-focus.mjs` | three probes, run in **Chromium and WebKit** |
| `./evidence/D*-*.png` | six new rendered frames, incl. the first **populated** wall in both schemes |

Probe parsimony: three probe scripts, six browser contexts per engine. Every run decided something
a code read could not. The prior pass never rendered a populated wall in dark or at 390 px; this
one does, in two engines.

**Reproduction environment.** Dev server `http://localhost:9000` (HEAD `c654824e`, branch
`tranche-u`). The loopback origin latches `detectDevMisconfig`
(`demo/platform/transport/availability.ts:107–127`), which is the **error arm** the whole visual
audit captured. The LAN origin `http://192.168.1.166:9000` clears the latch, so
`https://api.color.babb.dev/palettes?limit=50&sort=newest` is issued and interceptable — that is
the **populated arm**. Wire shape read from `useBrowsePalettes.ts:74–76`: `{data, nextCursor,
hasMore}`.

---

## 3. Findings

### Family F-1 · The housing is on the wrong element

#### D-01 · BLOCKER — the field wears the Card shell the constitution forbids; the entity slip wears none

`VISUAL-CONSTITUTION.md §3.1`, Browse row, verbatim:

> *"browse workspace chassis; **every rendered bounded palette entity slip has exactly one Card
> shell, and the field/empty/inspector have none**"*

and, in the same section:

> *"`Card` remains semantic housing for a bounded object or specimen and **is never the default
> page primitive**."*

Measured, exactly inverted:

- `BrowsePane.vue:2` — `<Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">`. The **field** is a Card.
- `PaletteCard.vue:5–27` — `<div role="article" class="group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer">`. The **entity** is a hand-rolled div. It imports `Badge` and `Button` from the design system; it does not import `Card`. Its own comment at `:12–15` argues the point: *"NOT `<Card surface=cartoon>`"*.
- `PROPORTION-AUDIT.md §5.12` fixes the entity tuple as `{size:"sm", material:"content", tier:"quiet", surface:"opaque", shadow:false, grain:false, specular:"off"}`. Not one of those seven props is expressible on the shipped element, because it is not a `Card`.

This is not local. `Card tier="resting"` opens **nine** route panes:

```
$ grep -rn 'Card tier="resting"' demo/ | wc -l
9
```

`demo/DESIGN.md:` canonizes it — *"the picker card AND all 9 pane cards (About, Palettes, Browse,
Extract, Mix, Generate, Gradient, Admin, ConfigSlider)"*. The demo's design doc has written down
the exact thing §3.1 forbids. BrowsePane is site 3 of 9.

**Cure (gestalt, not patch).** Delete `<Card>` from `BrowsePane.vue:2`; the field becomes the
browse workspace chassis' region content with no shell. Move the shell **down** one level:
`PaletteCard`'s root becomes `<Card>` with the §5.12 tuple. The nine-pane family closes in the
same cut — nine `Card tier="resting"` roots become chassis regions.

---

#### D-02 · MAJOR — five boundary devices in one nesting; caster inside caster

`PROPORTION-AUDIT.md PR-05`: *"Dividers, caster shadows and corner marks repeat a boundary →
**REMOVE**"*. `VISUAL-CONSTITUTION.md §7`: *"matte specimen slips inside a glass workspace, **not
cartoon casters stacked within casters**."*

Measured computed styles, 1440 × 900, populated wall:

| Element | boundary devices |
|---|---|
| pane Card (`BrowsePane.vue:2`) | `1px solid oklab(0.216 … / 0.04)` border + `box-shadow: color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px` |
| entity card (`PaletteCard.vue:19`) | `2px solid` border (from glass-ui `@utility cartoon-surface`) + `-3px 3px 0, -5px 5px 0, …` (3 stacked layers of `--shadow-cartoon-md`) |
| colour strip | its own `rounded-t-card` clip |

That is 2 borders + 4 hard shadow layers + 1 radius clip = **7 boundary marks across two nesting
levels**, for one bounded object. The constitution's target for this family is one.

---

#### D-03 · MAJOR — the pane and its own cards are lit from opposite directions

The pane's caster is `+8px +8px` (shadow down-**right** ⇒ light from upper-**left**).
Its children's caster is `-3px +3px, -5px +5px` (shadow down-**left** ⇒ light from upper-**right**).

Two contradictory light sources inside one 462 px column. Visible without instruments in
`./evidence/D-chromium-wall-populated.png`: the Browse pane's black caster sits on its right
edge; every palette card's caster sits on its left. `PROPORTION-AUDIT.md §5.8`: *"Real rendered
relation wins over token intent."* The rendered relation is incoherent.

---

#### D-04 · MAJOR — glass that blurs nothing, over a well that isn't neutral

`VISUAL-CONSTITUTION.md §2`:

> *"Structural glass | dock, header, primary plate | neutral Clear-Ice/Smoke family"* …
> *"**Glass earns its blur by revealing live content; otherwise it is a neutral well.**"* …
> *"Dark chrome uses the restrained neutral pole. Seed tint is forbidden outside the ambient field,
> active accent, WatercolorDot/specimen, and pastel Palettes lanes."*

Measured `getComputedStyle` on the pane root:

| scheme | `background-color` | α | OKLab chroma C | `backdrop-filter` |
|---|---|---:|---:|---|
| light | `oklab(0.928268 0.00554796 0.0132111 / 0.664)` | 0.664 | **0.01433** | `none` |
| dark | `oklab(0.395239 0.00969829 0.0165355 / 0.7536)` | 0.754 | **0.01917** | `none` |

Both halves of §2's sentence fail at once. It is not glass — `backdrop-filter: none`, so the 33.6%
of light passing through is the raw ambient field, unblurred, at full spatial frequency. And it is
not a neutral well — C = 0.0143 / 0.0192 is a warm tint on structural chrome, and the tint is
**34% stronger in dark than in light**, against *"dark chrome uses the restrained neutral pole."*

---

### Family F-2 · The composition is not the constitution's Browse composition

#### D-05 · BLOCKER — the equal-card matrix, measured: 50.0 / 50.0 where the law says 64–66.7 / 33.3–36, and no inspector exists

`VISUAL-CONSTITUTION.md §3.1`, Browse row:

> protagonist: *"discoverable public specimen field at **64%…66.6666667%** when selected"*
> support: *"complementary **selected-public-palette inspector** at **33.3333333%…36%**"*

and §3.1's closing sentence: *"**Resizing the old equal-card matrix cannot satisfy any member.**"*

Settled measurement, 1440 × 900 (t = 9000 ms, both schemes agree):

```
main   x= 16   w=1408
browse x=199   w=512.0
lib    x=729   w=512.0     →  512 / 1024 = 50.000 %   (law: 64 – 66.667 %)
                              512 / 1408 = 36.364 %   of the main
```

The protagonist gets **50.0%** of the pane pair — and 36.4% of the main, which is *less than the
maximum the law allots to the support region*. There is no inspector at all:

```
probe D · wall-after-click →  { "inspectorPresent": false, "ariaPressed": null }
```

The composition coordinate is `demo/shell/viewSchema.ts:124–131`:
`browse: { left: "browse", right: "palettes" }` — resolved by `usePaneRouter.ts`'s
`desktopLeft`/`desktopRight` slots. `VISUAL-CONSTITUTION.md §4.2` names that mechanism for
retirement by name: *"V retires the global Dock `PaneSegmentedControl` and **left/right view
state**."*

---

#### D-06 · BLOCKER — half the viewport is a *different route's* pane, empty

`VISUAL-CONSTITUTION.md §3` law 2, verbatim:

> *"Empty secondary content occupies at most a narrow invitation tray (≤15% of the stage) or
> disappears. **It never receives half the viewport.**"*

`./evidence/D-chromium-wall-populated.png` and `D2-chromium-wall-desktop-dark.png`: while the
Browse wall is scrolling ten palettes inside a 462 px column, the right 512 px holds `My Palettes`
displaying `· EMPTY PLATE · / No saved palettes yet. / Add colors above, then save the set.`

Measured: 512 px of 1024 = **50.0%** — 3.3× the law's ceiling — occupied by empty secondary
content that belongs to `/#/palettes`. `PROPORTION-AUDIT.md PR-04` is the owning row:
*"Empty/equal companion Cards and nested housing → **REMOVE** … Collapse absent support; Admin
companion 50%→0."* Browse is the same mechanism as the Admin companion PR-04 already condemns; it
was simply never enumerated.

---

#### D-07 · MAJOR — the empty/error plate does not content-hug; `h-full` reserves 2.4× its content

`VISUAL-CONSTITUTION.md §3.1`, Browse row: *"primary empty invitation **content-hugs**"*.

Measured, 1440 × 900, error arm (settled):

```
browse card   y=233.0  h=514.7   → bottom 747.7
error plate   y=386.7  h=212.6   → bottom 599.3
dead space below the plate      = 148.4 px  (28.8 % of the card)
card height / plate height      = 2.42 ×
```

Mechanism, one token: `h-full` at `BrowsePane.vue:2`. It pins the Card to the stage height
regardless of content, which is precisely "not content-hugging". Visible in every light and dark
desktop capture: a pink/mauve void of 148 px under `Retry`.

---

#### D-08 · MAJOR — the desktop composition buys 25% more specimens for 394% more pixels

`PaletteCardGrid.vue:4` — `class="palette-card-grid grid **grid-cols-1** gap-3 min-h-[120px]"`.
One column, hard-coded, at every viewport. `gridTemplateColumns` measured: `462px` at 1440,
`324px` at 390. Fully-visible cards, ten-row wall, both engines:

| viewport | area | fully visible palette cards |
|---|---:|---:|
| 1440 × 900 desktop | 1,296,000 px² | **5** |
| 390 × 844 mobile | 329,160 px² | **4** |

3.94 × the pixels; 1.25 × the specimens. A *"discoverable public specimen field"* that shows five
specimens on a laptop is a list, not a field, and §3 law 8 (*"One pane may have one full-strength
visual protagonist"*) has nothing to be protagonist over.

---

#### D-09 · MAJOR — the route has zero H1 and two peer H3s at display scale

`VISUAL-CONSTITUTION.md §4.1`: *"**Each route has one H1** and exactly one stable main landmark."*
`§5.1`: *"destination `<title>` and **the single visible H1** exist before app-ready."*

Measured on `/#/browse` in every matrix:

```
h1Count : 0        mainCount : 1
headings: H3 "Browse"       .pane-header-title font-display   41.888 px   Fraunces
          H3 "My Palettes"  .pane-header-title font-display   41.888 px   Fraunces
```

`REPORT.md`'s per-capture table records `h1 = 0` for all 60 captures. The largest ink on the route
is an `<h3>` at 41.9 px, and there are two of them at identical size — §3 law 8's *"one
full-strength visual protagonist"* fails at route scale as well as pane scale. Coordinate:
`demo/shared/ui/PaneHeader.vue:21`, consumed by all nine panes.

---

#### D-10 · MINOR — three concurrent scroll contexts at desktop

`BrowsePane.vue:2` and `PalettesPane.vue:26` both carry `overflow-y-auto h-full`. At 1440 the route
therefore owns the document scroller plus two independent inner scrollers side by side, each with
its own `scroll-timeline: --pane-scroll` header veil (`PaneHeader.vue:54–57`). Scroll position is
not shared, not restorable per `§5.1`'s Back/Forward row (*"restore that entry's document scroll"*
— the wall's position is not document scroll), and the `More from the commons` affordance sits at
the bottom of an inner scroller ~5,800 px long once 50 rows load.

---

### Family F-3 · The entity is a seven-mode omnibus with no selection seat

#### D-11 · BLOCKER — the card is a clickable `role="article"`, focusable by no keyboard, in either engine

`VISUAL-CONSTITUTION.md §5`, verbatim, is written against this exact element:

> *"A palette card is a bounded entity article, **not a clickable `role=article`**, `listbox`/`option`
> composite, or seven-mode omnibus. **One native named `<button type="button">` spans its
> specimen/identity region** and expresses inspector selection only through `aria-pressed`; it has
> no `aria-selected`. … The card body owns **no expand, inline rename, action menu, transient
> result or hover-only swatch-action path.**"*

Shipped (`PaletteCard.vue:5–27`), measured on the populated wall:

```
root : { tag:"DIV", role:"article", tabIndex:-1, ariaPressed:null,
         cursor:"pointer", ariaLabel:"Palette: Wall Palette 1" }        ← @click="$emit('click')"
firstButton (first <button> inside) : "1 votes, click to vote"          ← not a specimen/identity seat
ariaSelectedCount: 0    ariaPressedCount: 3 (all outside the wall)
```

Programmatic focus, **both engines**:

```
chromium  cardRootFocusable → { becameActive:false, hasTabindexAttr:false }
webkit    cardRootFocusable → { becameActive:false, hasTabindexAttr:false }
```

This is the two-engine proof MT-F022 demands, and it is **not** roving tabindex. Roving tabindex
leaves every item programmatically focusable (`tabindex="-1"` is focusable via `.focus()`); here
there is no `tabindex` attribute at all and `.focus()` is a no-op in Chromium and WebKit alike. The
Chromium Tab walk confirms the consequence — the wall contributes only inner controls, never a seat:

```
… INPUT(browse search) → BUTTON "Filters" → BUTTON "1 votes, click to vote"
  → BUTTON "Palette menu" → BUTTON "2 votes…" → BUTTON "Palette menu" → …
```

The card's own activation (`pm.toggleExpand(palette.slug)`, `BrowsePane.vue:102`) has **no keyboard
path**. And the seven modes §5 forbids are all present on the body: expand (`:97`), inline rename
(`PaleteCard.vue:112–120`), action menu (`:83–106`), transient result (`ActionFeedback`, `:123`),
hover-only swatch popover (`useHoverPopover`, `:139–157`).

The component's own comment (`PaletteCard.vue:2–4`) argues *"button semantics on the card are
omitted because inner interactive controls must be reachable — using article + click is the correct
pattern."* The constitution overrules that reasoning specifically: the seat is a **nested** button
spanning specimen/identity, not the root; inner controls stay reachable as siblings.

---

#### D-12 · MAJOR — a `role="list"` whose children are all `role="article"`: a list with zero items

`PaletteCardGrid.vue:3` declares `role="list"`; every child is `PaletteCard`'s `role="article"`
(`PaletteCard.vue:22`). Measured, both viewports, both engines:

```
listRoles.children = ["article","article","article","article","article",
                      "article","article","article","article","article"]
```

`list` owns `listitem` children. An `article` child is not owned, so the wall announces as a list
of **zero items** and the ten palettes are not enumerable, countable, or navigable by list commands.
The pane's only real `role="status"` on this route belongs to the *other* pane:

```
liveRegions = [ { role:"status", text:"· empty plate ·No saved palett…" } ]   ← PalettesPane
```

---

#### D-13 · BLOCKER — the palette's name is crushed to 5.6 px by its own badges; two-engine

The card's protagonist is its identity — `VISUAL-CONSTITUTION.md §4`: *"palette identity |
`--type-subheading` | Fraunces"*. Measured on the first card (a `Featured` palette), both engines:

| viewport | identity span width | clipped |
|---|---:|---|
| 1440 × 900 | 128.8 px | `false` — but rendered `"Wall Palett…"` (see `./evidence/D3-chromium-vote-chip-focused.png`) |
| 390 × 844 (chromium) | **5.6 px** | `true` |
| 390 × 844 (webkit) | **5.6 px** | `true` |

`./evidence/D2-chromium-wall-mobile-light.png` shows the result: the name renders as a 5.6 px-wide
vertical stack of clipped glyph stubs — a `W` fragment over a `P` fragment — while `🏅 Featured`,
the `4` count badge, the `warm` tag chip, the `♡ 1` vote chip and the `···` menu all render at full
size beside it.

**Mechanism**, `PaletteCard.vue:43–79`: the metadata row is
`<div class="flex items-center gap-2 min-w-0">` in which **every decoration carries `shrink-0`** —
`:64` featured badge, `:72` count badge, `PaletteCardMeta`'s chips, `:82` menu wrapper — while the
identity span (`:54–59`) is the only flexible item. It therefore absorbs 100% of the width deficit.
The hierarchy is exactly inverted: `PROPORTION-AUDIT.md §5.2` — *"A card has one protagonist, one
identity line, and at most one persistent action/status region"* — the shipped card has one
identity line and **five** competing fixtures, and the identity is the one that loses.

---

#### D-14 · MINOR — the expanded card renders the same four colours twice, in two visual languages

`./evidence/D-chromium-wall-populated.png`, card 1 expanded: the collapsed state already shows the
palette as a full-bleed four-band strip (`PaletteColorStrip`, `PaletteCard.vue:33–37`); the
expanded state adds the same four colours again as ~55 px WatercolorDots
(`PaletteCardSwatches`, `:139`). One specimen, two renderings, one card — against §5.2's
*"one protagonist"*.

---

#### D-15 · MINOR — the specimen is `aria-hidden`

`PaletteColorStrip.vue:2–5` — `aria-hidden="true" role="presentation"`, commented *"color strip is a
decorative visual"*. `VISUAL-CONSTITUTION.md §5`: *"the card's compact swatch strip remains
**noninteractive data** with zero activation/focus/drag semantics"*, and §4.2: *"data-bearing static
faces remain present as noninteractive **named list/text content**"*. The palette's actual colours —
the only reason the entity exists — are declared decoration and removed from the accessibility
tree. The card's entire AT content is `"Palette: Wall Palette 1"`, a bare `4`, a tag and a vote
count.

---

### Family F-4 · States that were never designed

#### D-16 · BLOCKER — one **Retry** click permanently destroys the pane body. Two engines.

The error plate offers exactly one recovery affordance (`BrowsePane.vue:69–76`). Clicking it
terminally blanks the pane. Clean page, error arm, 6-second tail, sampled every 60 ms:

**Chromium**
```
before      : { children:1, h:240.5, text:"The commons is unreachable. Failed to load palettes Retry" }
t=  62 ms   : n=1  h=240.5  "The commons is unreachable. Failed to load pal"
t= 904 ms   : n=1  h=234.3
t=1021 ms   : n=0  h= 21.1  ""          ← content gone
t=2342 ms   : n=0  h= 12.0  ""
after 6 s   : { children:0, h:12,
                paneText:"Browse Discover palettes from the community. My Palettes …" }
```

**WebKit**
```
before      : { children:1, h:224.5, … }
t=  61 ms   : n=1  h=224.5
t= 303 ms   : n=0  h= 12.0  ""          ← content gone
after 6 s   : { children:0, h:12, paneText:"Browse Discover palettes from the community. …" }
```

Terminal state, both engines: the Browse pane is a title, a description, a search field, and
**nothing** — no error, no empty plate, no skeleton, no retry. A 12 px residue where the body was.
Screenshot: `./evidence/D3-chromium-after-retry.png`.

This is a design defect before it is an implementation defect. The wall's three states are keyed on
one `<Transition name="vj-morph" **mode="out-in"**>` (`BrowsePane.vue:40`) whose own comment
(`:30–39`) claims *"the skeleton's last shimmer sweep hands off into the enter (one clock, no
double-flash)"*. `mode="out-in"` is by construction the opposite of a hand-off — *leave fully, then
enter* — and `VISUAL-CONSTITUTION.md §6` forbids the result by name: *"A scene swap preserves the
specimen and changes the surrounding instrument. **No full-slab remount hole**, rAF-delayed blank,
or dock collapse."* A three-state machine that can settle faster than its own leave duration cannot
be driven by `out-in`; nothing recovers it, because there is no fourth state to fall into.

*(Pass-1's D-01 claimed this. It reproduces at pass 2 with different timings and in a second
engine. **CONFIRMED, upgraded to two-engine.**)*

---

#### D-17 · MAJOR — the true-empty invitation and the pagination affordance render together

Reproduced live before I fixed my fixture's wire shape: a 200 response carrying zero rows and
`hasMore:true` yields, in one frame,

```
"· THE COMMONS ·  No published palettes here yet.
 Publish one from My Palettes and start the wall.
 More from the commons"
```

Two mutually exclusive statements stacked: *there is nothing here, start the wall* and *there is
more, fetch it*. Coordinate: `BrowsePane.vue:132–133` —

```
v-else-if="pm.hasMore.value && !pm.browsing.value && !pm.browseError.value"
```

— no `displayedBrowse.length > 0` guard. `VISUAL-CONSTITUTION.md §7`: *"A true empty invitation
content-hugs its text/action"* — the invitation is not true-empty when a next page is promised, and
the same plate is also shown for a zero-**result** filter, where *"Publish one from My Palettes"* is
simply wrong advice.

---

#### D-18 · MAJOR — changing the sort has no visible state anywhere

The whole refinement grammar (Sort · Tier · Tags · Find by Color) lives behind one 32 × 32
`EllipsisVertical` trigger (`SearchFilterBar.vue:5–13`). Its only state register is a count badge
computed at `:188–194`:

```ts
const activeFilterCount = computed(() => {
    let count = 0;
    if (tier) count++;
    count += selectedTags.length;
    if (colorSearchActive.value) count++;      //  ← sort is never counted
    return count;
});
```

So switching the wall from *newest* to *popular* to *most-forked* changes the badge by zero,
changes no label, and leaves the wall's order silently different. `VISUAL-CONSTITUTION.md §4.1`:
*"**Selected**, failed, pending, withdrawn and disabled states are never color-only. Role,
accessible name, **state/value** and associated error/status are explicit."* `PROPORTION-AUDIT.md
PR-07` is the owning row (*"Hover-only/unlabeled controls and invisible … state →
ADD-AFFORDANCE"*).

---

#### D-19 · MAJOR — the sort-pending arm is opacity-only and fully interactive

`BrowsePane.vue:87–90`:

```
:grid-class="'transition-opacity duration-fast ' + (pm.sortLoading.value ? 'opacity-50' : '')"
```

`opacity: 0.5` is the entire pending register: no `aria-busy`, no `pointer-events-none`, no
disabled state, no status text. During the pending window the user can vote on, expand, rename or
delete a row that is about to be replaced by a different sort's page. §4.1 again: *"Selected,
failed, **pending**, withdrawn and disabled states are **never color-only**."*

---

#### D-20 · MAJOR — the wall has no status region; the two loading blocks are named illegally

`BrowsePane.vue:47` and `:128` put `aria-label="Loading palettes"` / `"Loading more palettes"` on
bare `<div>`s with no role. `aria-label` on a generic container with no role is not mapped —
the name is discarded. Measured live: the populated route's only live region belongs to
`PalettesPane`. Consequently filtering ten results to zero, a sort completing, a page arriving, and
a load failing all announce **nothing**. `VISUAL-CONSTITUTION.md §5.1`, in-route filter row:
*"changed result count/state **through the owning status region**"* — there is no owning status
region.

---

#### D-21 · MAJOR — re-entering the route destroys the wall and collapses the layout by 472 px

Measured round trip `#/browse → #/palettes → #/browse`, populated wall, 900 ms server latency,
sampled every 40 ms:

```
t=170 … 366 ms : cards=10  skeletons=0  bodyHeight=1135.4
t=414 …1405 ms : cards= 0  skeletons=4  bodyHeight= 663.7   ← −471.7 px, ~1050 ms
t=1461 ms      : cards=10  skeletons=0  bodyHeight=1180.5
```

Every entry re-mounts and re-requests; the ten (or fifty) rows are replaced by four skeletons whose
count is a bare literal unrelated to the payload (`SKELETON_COUNT = 4`, `BrowsePane.vue:207`; and
`v-for="i in 2"` at `:130`). Because 4 ≠ 10, the collapse is guaranteed by construction.
`VISUAL-CONSTITUTION.md §6`: *"A scene swap **preserves the specimen** and changes the surrounding
instrument."* The specimen is exactly what is discarded. §7: *"Request-bound skeletons exist only
while real work is in flight"* — the work here is re-fetching what was already on screen.

---

#### D-22 · MINOR — sub-target controls, and the whole refinement surface behind one glyph

`REPORT.md` records `smallTapTargets: 4` on `/#/browse` in **all four** Safari matrices — and that is
the *error* arm, with no cards rendered. `SearchFilterBar.vue:5` is one of them (`h-8 w-8` = 32 ×
32). The populated arm adds a `♡ n` vote chip per row. `PROPORTION-AUDIT.md §5.7`: *"Visual glyph
size, operable target size and layout reservation are separate quantities"* — the fix is seat
geometry, not bigger chrome, and neither is present.

---

### Family F-5 · Material: the specimen dissolves into its own stage in dark

#### D-23 · MAJOR — ΔEok(specimen, stage) = 0.0998; ΔEok(cell₁, cell₂) = 0.0878; no separators anywhere

`VISUAL-CONSTITUTION.md §2`: *"Specimen well | image, curve, palette or code artifact | **opaque/quiet
neutral stage; the specimen supplies color**."* `§4.1`: *"Text, focus, **boundaries** and state meet
their rendered contrast on the actual material tier."*

`PaletteColorStrip.vue:13–23` draws N adjacent `<div>`s with `background-color` and **no border, no
gap, no separator, and no outer edge against the card body**. Sampled from the rendered dark frame
`./evidence/D2-chromium-wall-desktop-dark.png` (DPR 2, palette `#1a1512 #2f2a24 #e11d48 #2563eb`):

| pair | ΔE (OKLab) | WCAG CR |
|---|---:|---:|
| strip cell 1 ↔ strip cell 2 | **0.0878** | 1.27 : 1 |
| strip cell 2 ↔ card body `rgb(77,66,58)` | **0.0998** | 1.35 : 1 |
| strip cell 1 ↔ card body | 0.1875 | 1.86 : 1 |

For calibration, adjacent steps of a standard neutral ramp measure ΔEok 0.064 – 0.110. **The card's
own surface is one ramp-step away from the palette it is displaying.** The `4` badge says four
colours; the rendered strip shows two, and its left edge against the stage is invisible. A
five-step neutral ramp — the single most common artifact a colour tool produces — renders in dark as
one undivided block.

---

#### D-24 · MINOR — the entity surface is 44% more chromatic in dark than in light

| scheme | entity card `background-color` | OKLab C |
|---|---|---:|
| light | `oklab(0.913295 0.00550478 0.0130424)` | 0.01416 |
| dark | `oklab(0.345295 0.0103877 0.0175526)` | **0.02040** |

§2: *"Dark chrome uses the **restrained neutral pole**."* Measured, the dark pole is the less
restrained one, on both the entity (+44%) and the pane (+34%, D-04).

---

### Family F-6 · Type jurisdiction

#### D-25 · MINOR — Fraunces on a `text-heading` role, in the closed matrix

`VISUAL-CONSTITUTION.md §4` declares its matrix *"closed across all eighteen compositions"*:
`section heading → text-heading → **Plus Jakarta Sans**`; Fraunces owns only `text-display`,
`--type-title`, `--type-subheading`.

`EmptyState.vue:20` and `:58` ship `class="**font-display** text-heading …"` — the `text-heading`
size rung with the Fraunces family bolted on. Measured on the live error plate: `fontFamily:
"Fraunces"`, `fontSize: 25.888px`, `fontWeight: 700`. A statement of failure is not a route H1, an
instrument identity, or a palette identity. `PROPORTION-AUDIT.md §5.13` restates the same closure.
Eight consumers inherit it.

---

### Family F-7 · The design-system boundary

#### D-26 · MAJOR — `.search-seated` is a consumer override of a producer root, unlayered to beat it, at three sites

`BrowsePane.vue:12` applies `class="search-seated"` to glass-ui's `SearchBar`. The rule
(`demo/styles/utils.css:132–154`) rewrites four properties of the producer's root — `background`,
`backdrop-filter`, `border`, `box-shadow`, `max-width` — plus its focus ring and its field font.
Its own header says so:

> *"**INTERIM DEMO SEAT** — a consumer opt-in on the producer recipe (**unlayered, so it wins over
> the `@layer components` recipe by layer order**) … **BOOKED SWAP** … dies onto glass-ui's P3 seated
> field-chrome rung — GLASSUI-T-ASKS ASK-D (`variant="seated"`)."*

Three consumers ship it: `BrowsePane.vue:12`, `PalettesPane.vue:35`, `admin/AdminPane.vue:14`. The
owner edict is *"Glass-ui is the design system — variants/primitives belong in glass-ui"* and
*"Root-level styling — style at the shadcn/glass root component level, never per-instance
overrides."* A three-consumer variant with a written specification (`fill / edge / stamp / measure /
voice`) is a producer variant that has been implemented in the consumer and deliberately escapes the
cascade layer designed to let the producer own it. glass-ui is at `^7.0.0`; the booked ASK-D is the
cure and it is overdue.

---

## 4. Pass-1 claims re-tested — confirmed, corrected, killed

| pass-1 claim | pass-2 verdict | evidence |
|---|---|---|
| D-01 Retry permanently blanks the pane | **CONFIRMED, strengthened** → my D-16, now two-engine | chromium t=1021 ms, webkit t=303 ms, both terminal at 6 s |
| D-02 equal-card matrix inside a forbidden Card shell | **CONFIRMED, quantified** → D-05/D-01 | 512/1024 = 50.000 %; nine `Card tier="resting"` sites |
| D-03 no inspector; card is the omnibus | **CONFIRMED** → D-05/D-11 | `inspectorPresent:false`; seven modes enumerated on the body |
| D-06 the empty plate lies when merely filtered | **CONFIRMED, extended** → D-17 | reproduced live, plus the `hasMore` contradiction |
| D-09 sort-pending is opacity-only and interactive | **CONFIRMED** → D-19 | `BrowsePane.vue:87–90` |
| D-10 the loading states carry no accessible name | **CONFIRMED** → D-20 | measured `liveRegions` |
| D-13 the plate floats in a fixed-height card | **CONFIRMED, quantified** → D-07 | 148.4 px dead, ratio 2.42× |
| D-14 `.search-seated` is a per-instance producer override | **CONFIRMED** → D-26 | three consumers, unlayered |
| **D-11 the search placeholder is hard-clipped on mobile, both directions** | **KILLED** | Chromium 390 px: text 151.0 px vs 236.0 px available. WebKit 390 px: 151.1 vs 235.0. **Fits, in both engines, with 36% slack.** The clip visible in `shots/safari-mobile-light/browse.png` and `shots/rtl-mobile/browse.png` occurs in the **font-swap window** with a wider fallback face; it is a font-loading transient, not a geometry defect of the field. Downgraded to INFO. |
| **R2.1 the palette seat is 0-of-10 keyboard reachable — BLOCKER** | **CORRECTED and re-proved on a narrower claim** → D-11 | The *card root* is unfocusable in both engines (`.focus()` no-op, no `tabindex` attribute) — that is real and is **not** roving tabindex. But the wall is not "pointer-only": every card exposes two Tab-reachable named controls (`"n votes, click to vote"`, `"Palette menu"`), measured in the Chromium walk. The route's 7/12 gap in the empty arm **is** dock roving tabindex and is **CORRECT**; not born-RED, per MT-F022. |
| **R2.8 `.pane-scroll-fade` promises a fade the CSS never implements** | **KILLED** | `PaneHeader.vue:54–57` defines `scroll-timeline: --pane-scroll block`; the header's `::before` veil (`:63–80`) is its consumer. The fade exists; the producer/consumer pair is simply split across one file boundary, which the file's own comment explains. |
| **R2.6 the route's primary control has no accessible name** | **KILLED** | `SearchFilterBar.vue:5` — `aria-label="Filters"`. `REPORT.md` records `namelessButtons` for `/#/browse` = **0** in all four matrices, and my Tab walk reads the name. |
| **R2.2 in dark the specimen is invisible against its stage at 1.41 : 1** | **CORRECTED** → D-23 | Real mechanism, wrong metric. WCAG CR is luminance-only and mis-scores chromatic pairs. Re-measured in OKLab: ΔE(cell,stage) = 0.0998, ΔE(cell₁,cell₂) = 0.0878, against a neutral-ramp step of 0.064–0.110. |

---

## 5. Negative proofs — what I attacked and could not break

1. **No horizontal overflow, anywhere.** `STATES.json`: `overflowX = 0` for `/#/browse` in
   `zoom-200-desktop`, `reduced-motion-desktop`, `forced-colors-desktop`, `rtl-desktop`,
   `rtl-mobile`, `keyboard-focus-desktop`. `REPORT.md`'s `horizontalOverflow` bucket is empty for
   all 60 captures. `clipped: []` for browse in every matrix. I tried and could not produce one.
2. **Motion is tokenized and reduced-motion-correct.** The three families
   (`vj-enter`/`vj-morph`/`vj-celebrate`) key producer tokens only —
   `animations.css:83–139` uses `--duration-fast`, `--duration-normal`, `--spring-snappy`,
   `--ease-accelerate`; no ad-hoc durations. A global guard neutralises all three
   (`animations.css:177–182`), and the stagger family is fenced behind
   `@media (prefers-reduced-motion: no-preference)` (`:43`). `STATES.json` records
   `rafPer1500ms: 0` on `/#/browse` under `reduced-motion-desktop` against 270 at rest.
   BrowsePane defines no local keyframes and deletes none.
3. **No layout-forcing property transition on the entity card.** Measured
   `transitionDuration: 0s` on the card root in both schemes; the `transitionProperty: "all"` I first
   read is the CSS initial value, not an authored transition. Motion comes from the producer's
   `useLiquidPress` transform and the `.cartoon-cast` child — compositor-only. The `vj-morph`
   family's `max-height` leg is inert here because `--vj-morph-collapse/-expanded` are unset at this
   site.
4. **Keyboard focus is visible on the wall's controls.** `./evidence/D3-chromium-vote-chip-focused.png`
   shows a rendered focus rectangle around the Tab-focused `♡ 1` chip. My first computed-style read
   suggested a transparent ring; the frame refutes it. *(Standing note: the indicator is a 1 px
   hairline on a card whose every other boundary is 2 px+ — the weakest mark on the surface. Recorded
   as an observation, not a finding.)*
5. **Every control on the route is named.** `namelessButtons` for `/#/browse` = 0 in all four Safari
   matrices, unlike `/#/extract` (3) and `/#/gradient` (1).
6. **`verbatimModuleSyntax` is honoured.** `BrowsePane.vue:197` — `import type { Palette, Tag }`.
   No mixed type/value import in the file.
7. **No god module, no legacy shim in this file.** 360 lines, 15 focused handlers, the shared
   `useDialogBrowseActions` composable rather than a second hand-rolled fork (`:256–265`). The one
   defensive branch (`availableTags`, `:215–220`) is a masking fallback for a wire-shape lie and is
   correctly flagged by CHALLENGE-C — it is not a back-compat shim.
8. **`main` landmark count is exactly 1** on `/#/browse` in every matrix, and the pane emits no
   nested `<main>` — §3.1's landmark-neutrality rule holds.
9. **Forced colors: inconclusive, not passing.** `shots/forced-colors-desktop/browse.png` retains
   full colour and the pink ambient field; WebKit on macOS does not implement `forced-colors`
   emulation, so the matrix proves nothing either way. `grep -rn "forced-colors" demo/` returns
   nothing, so the pane ships **no** forced-colors treatment — but that is an untested surface, and I
   decline to born-RED it without a Windows HCM frame.

### Hypotheses (labelled — no reproduction I trust)

- **H-1 · the route's entrance may still be animating six seconds after load.** On a *cold* browser
  context in light scheme the pane pair was measured at `x = −373, 529.7 × 532.3` at t = 3500 ms,
  `x = −329, 528.3 × 530.9` at t = 6000 ms, and only reached its settled rect
  `x = 199, 512 × 514.7` by t = 9000 ms — a converging scale from 1.0346 → 1.0. A *warm* dark
  context was settled at t = 3500 ms. I cannot separate a pathological spring from cold-start module
  compilation with the runs I have. If real, it violates §6's *"exit is shorter than entry"* economy
  and `REPORT.md`'s own 3.5 s settle budget. **Two-engine, warm/cold-controlled re-measurement
  required before this becomes a finding.**
- **H-2 · the dark ambient field.** `shots/safari-desktop-dark/browse.png` shows the full-bleed field
  still in its bright light-mode pink while the cards go dark — a page whose dominant surface has no
  dark adaptation. My own Chromium dark capture shows a correctly dark maroon field. The difference
  is the persisted `value-color-session/v2` seed, not the scheme. Shell business, not BrowsePane's,
  and not reproducible on a clean profile. Recorded for the shell seat.
- **H-3 · the `Palettes` pastel-rainbow identity coordinate fails in dark.** Light captures render
  `Palettes` in the pastel gradient; every dark capture (audit's and mine) renders it flat white.
  §2 requires it in *"both schemes"*. This is `PalettesPane`'s coordinate, on BrowsePane's route.
  Relayed, not claimed.

---

## 6. The gestalt cure

Not twenty-six patches. Four transpositions, in this order:

1. **Move the shell down one level.** `Card` leaves `BrowsePane.vue:2`; `PaletteCard`'s root
   *becomes* `Card` with §5.12's exact seven-prop tuple. This alone kills D-01, D-02, D-03, D-04,
   D-07 (no `h-full` on a Card to pin), and gives D-24's tint a single owner.
2. **Build the composition the constitution already specifies.** Field at 64–66.7%, a real
   *selected-public-palette inspector* at 33.3–36%, `right: "palettes"` deleted from
   `viewSchema.ts:126`. The inspector then receives everything §5 says must leave the card body —
   rename, lifecycle, export, versions, flags, durable operation state — which collapses the
   seventeen-handler omnibus at `BrowsePane.vue:102–116` and kills D-05, D-06, D-11's seven modes,
   D-14. The card keeps one native `<button type="button" aria-pressed>` spanning specimen +
   identity: D-11's keyboard hole closes as a consequence, not as a patch.
3. **Give the wall one owning status region and one honest state machine.** Replace `mode="out-in"`
   with a preserved-specimen swap; add the fourth state the machine needs so a settled-during-leave
   transition has somewhere to land (D-16); gate the empty invitation on
   `!hasMore && !query && !filters` (D-17); make sort a visible register (D-18); make pending a
   real `aria-busy` + inert arm (D-19); route count changes through the status region (D-20);
   keep the wall across route re-entry (D-21).
4. **Return `.search-seated` to the producer** as glass-ui `variant="seated"` (ASK-D is already
   booked) and let the entity strip draw its own boundary — one hairline between cells and against
   the stage closes D-23 in every scheme, at every palette.

The identity/decoration inversion (D-13) is a two-token fix inside step 1: the identity span takes
`min-w-0 flex-1` and the decorations lose their unconditional `shrink-0` priority. It is listed
separately only because it is the ugliest single frame in the audit.

---

## 7. Evidence index

| Artifact | What it shows |
|---|---|
| `./probe-D-design.mjs` | composition ratio, plate acreage, computed chrome, ink roles, placeholder fit — 4 matrices |
| `./probe-D2-states.mjs` | populated wall in dark + at 390, Tab walk, ARIA list, route-re-entry collapse |
| `./probe-D3-retry-focus.mjs` | the Retry blank (both engines), programmatic card focus (both engines), focused-chip frame |
| `./evidence/D-chromium-wall-populated.png` | the route's real desktop truth: a 462 px wall beside an empty 512 px plate |
| `./evidence/D2-chromium-wall-desktop-dark.png` | the dark specimen dissolving into its stage |
| `./evidence/D2-chromium-wall-mobile-light.png` | the 5.6 px palette name |
| `./evidence/D3-chromium-after-retry.png` | the pane after one Retry click |
| `./evidence/D3-chromium-vote-chip-focused.png` | the focus rectangle (negative proof) + desktop `"Wall Palett…"` truncation |
| `./challenge-D-design-pass1.md` | the pass-1 seat's report, preserved verbatim |

Engines: Chromium (`channel: chromium`, ANGLE/SwiftShader) and WebKit, both via
`@playwright/test`. Origins: `http://localhost:9000` (error arm, misconfig latch) and
`http://192.168.1.166:9000` (populated arm, `api.color.babb.dev` intercepted). Repo
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`. No source file was
edited by this seat.

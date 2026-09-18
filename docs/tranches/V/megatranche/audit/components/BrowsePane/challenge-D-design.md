# CHALLENGE-D · PASS 5 — `demo/palettes/BrowsePane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this seat
was explicitly spawned with. Declared at the seat, not inherited from a parent.

---

## 0. Verdict

**DEFECTIVE.**

Four CHALLENGE-D passes already stand at this path (~76 findings). I did not re-run them; I indexed
every header and every finding id before writing a word of §3, and I do not re-report a single
family they own. This pass contributes **six findings no prior pass raised** — one BLOCKER — plus
**one environment correction that invalidates a premise pass 4 built its whole apparatus on**, and
**six negative proofs**, two of which retire hypotheses that were left open.

The strongest new result:

> **On a colour commons, under `forced-colors: active`, the palettes have no colour.** The wall's
> specimen — `PaletteColorStrip` — renders as bare `<div>`s with an inline `background-color` and is
> **absent from `demo/styles/foundation.css`'s colour-surface roster**. So WHCM substitutes system
> colours into it and a five-colour palette becomes **five identical white bands**
> (`stripDistinctBg: ["rgb(255,255,255)"]`, measured). Meanwhile everything decorative on the same
> page **is** on the roster and keeps full saturation: the aurora ground, the empty plate's three
> ghost dots, and — the exact inversion — the *duplicate* copy of the same swatches inside the
> expanded card, which renders `rgb(229,83,61)` for the very colour the wall above it paints white.
> The roster's own header comment (`foundation.css:653–657`) states its purpose: *"the surfaces whose
> whole PURPOSE is to show a color — the actual content of a color tool — must survive WHCM's
> system-color substitution."* The one surface that fails the policy is the content of the commons.
> The same roster is reused by `@media print`, so the wall also does not print
> (`printColorAdjust: "economy"` on the specimen vs `"exact"` on the decorative dots) — against
> `foundation.css:793`'s own declaration that *"the palette IS a printable artifact"*.

The second: **every card on the wall casts an impossible shadow.** The entity card adopts the
producer `cartoon-surface` register — a three-layer caster offset to the **lower-left**
(`-3px/-5px/-7px` on X, `+3/+5/+7` on Y). `PaletteCardGrid.vue:50–52` sets `contain: content` on the
grid, and the card fills the grid exactly: `slackLeft = 0`, `slackRight = 0`. A controlled
two-sample pixel measurement on one frame, one card, one shadow: **left axis Δluminance `0.0` across
12 px; bottom-gutter axis Δluminance `96.8` across 7 px.** One leg paints, the other is deleted. The
last card's bottom slack is also `0.0`, so **card *n* has no caster at all while cards 1..*n*−1 have
half of one** — the cards on one wall do not agree with each other.

The third: **pass 4's reproduction environment does not exist on this machine.** Pass 4 built both
its arms on the premise that *"the loopback origin latches `detectDevMisconfig`, so no request is
issued"* and reached the populated wall over a LAN origin to escape it. Measured: this dev server
runs with `VITE_API_URL` **set**, and `detectDevMisconfig` returns `false` on its first line when it
is (`availability.ts:112`). The latch **cannot** fire. The live loopback failure is an ordinary
CORS-blocked cross-origin fetch surfacing as `ApiUnavailableError: Backend unreachable`.

**Model observed: Opus 5 (`claude-opus-5[1m]`).**

---

## 1. Provenance — what I deliberately did not re-litigate

| file | findings | status |
|---|---|---|
| `./challenge-D-design-pass1.md` | 20 + 11 (R2.x) | preserved |
| `./challenge-D-design-pass2.md` | 26, six BLOCKER | preserved |
| `./challenge-D-design-pass3.md` | 15 + 6 negative proofs | preserved |
| `./challenge-D-design-pass4.md` | 7 + 11 concurrences | **preserved verbatim from the prior `challenge-D-design.md` before this write** |

Families already owned and **not** re-reported: the `Card` shell inversion; the equal-card
50/50 matrix and the missing inspector; the clickable `role="article"`; `role="list"` over
`role="article"`; the stateless/seatless expand (pass 4 D4-01); the specimen's area share
(D4-02); inert `show-slug` (D4-03); data-dependent card height (D4-04); the vote chip's name
(D4-05); `PaneHeader`'s scroll-driven motion under PRM (D4-06); `.search-seated` (D-14 / D-26 /
D4-07); the `DevMisconfigError` collapse; the filtered-to-zero lie; the Retry blanking; the
sort-pending wash; the mobile placeholder clip; `pane-scroll-fade`; the dark-mode specimen
contrast; caster *stacking*; `cardRefs` growth; the RTL full stop; the colour-search radius.

**MT-F022 compliance.** I did not born-RED the 7/12 keyboard-reachability figure, did not re-derive
it, and make no claim about roving tabindex. My one keyboard finding (D5-02) is a *focus-destruction
event*, not a reachability count, and is measured as a state transition on a single control.

### Reproduction environment — measured, not assumed

Branch `tranche-u`, HEAD `c654824e`. Dev server live at `http://localhost:9000` (not started or
modified by me).

```
$ curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/      → 200
```

The populated arm is reached on the **loopback origin** with a Playwright `route` stub on
`http://localhost:3000/**` — the real `BASE_URL` on this server. Non-`GET` is aborted, so **no
mutating verb is ever issued and nothing is written to the commons.** See §5.6 for why the LAN
detour pass 4 used is unnecessary here.

**Stub honesty.** `demo/palettes/types.ts:38` names the vote field `voteCount`, **not** `votes`. My
first stub set `votes`, so every heart in `./evidence/D-p5-wall-normal.png` and
`./evidence/D-p5-wall-forcedcolors.png` reads `0`. **That is my stub's bug, not the app's.** It is
named here so no reader mistakes it for a finding; no finding below rests on a vote count.
`p5-D-geometry.mjs` and `p5-D-clip.mjs` set `voteCount` correctly and render `14`.

---

## 2. Visual truth — the frames this pass adds

No prior pass photographed this component under a **user-preference modality**. The mega-tranche
matrix is four matrices of light/dark × desktop/mobile only; `STATES.json` carries
`reduced-motion` / `rtl` / `zoom-200` rows but no forced-colors or print row for `/#/browse`.

| frame | what it establishes |
|---|---|
| `./evidence/D-p5-wall-normal.png` | the populated wall at 1440, normal register — the baseline |
| `./evidence/D-p5-wall-forcedcolors.png` | **the same wall under `forced-colors: active`: not one palette colour survives**, while the aurora, the ghost trio and the expanded duplicate keep theirs |
| `./evidence/D-p5-wall-print.png` | the `@media print` arm |
| `./evidence/D-p5-clip-wall.png` | the frame the caster pixel samples are taken from |
| `./evidence/D-p5-modality.json` · `D-p5-geometry.json` · `D-p5-clip.json` | raw probe output |

Read the forced-colors frame beside the normal one. In the normal frame each card is a colour
specimen with a caption. In the forced-colors frame each card is a **white rectangle with a caption**
— and the only colour left in the Browse pane is the five dots inside the one card that happens to
be expanded. A viewer in WHCM cannot tell "Sunset Commons" from "Cold Open" from
"A Very Long Palette…" by looking, because the thing that distinguishes them has been erased and the
thing that survived is decoration.

---

## 3. New findings

### D5-01 · BLOCKER — under `forced-colors: active` the commons has no colours; the decoration keeps its own. The same omission makes the wall unprintable.

**Defect.** `demo/styles/foundation.css:659–696` declares a two-tier `forced-color-adjust` policy
around an explicit **colour-surface roster**, for the stated reason that a blanket substitution
*"would DESTROY the color content the tool exists to show"* (`:666–667`). The Browse wall's specimen
is not on the roster. Every decorative colour surface on the same route is.

**Evidence — the roster, quoted** (`foundation.css:678–696`):

```css
@media (forced-colors: active) {
    canvas, .spectrum-picker, .gamut-overlay, .atmosphere-canvas,
    [data-glass-field-canvas], .gradient-rail, .rail-handle, .readout-rail,
    .swatch-row > *, .generate-swatch, .shadow-swatch, .goo-blob-canvas,
    .watercolor-swatch, .glass-slider[data-variant="spectrum"] .slider-range,
    [data-color-surface] { forced-color-adjust: none; }
```

**Evidence — the wall's specimen, quoted** (`PaletteColorStrip.vue:13–23`): each segment is

```html
<div class="shrink-0" :class="… 'h-full'" :style="{ backgroundColor: color.css, width: … }" />
```

No roster class, no `data-color-surface`, no `canvas`. Grepped across the whole feature tree — the
roster tokens appear in `palettes/` **twice**, on neither of the Browse card's surfaces:

```
$ grep -rnE "swatch-row|data-color-surface|watercolor-swatch|generate-swatch|shadow-swatch" demo/palettes/
demo/palettes/browser/card/ShadowPalette.vue:75:    class="shadow-swatch animate-pulse …"
demo/palettes/browser/card/CurrentPaletteEditor.vue:27:  class="swatch-row flex items-center …"
```

**Evidence — measured live** (`./probe/p5-D-modality.mjs`, Chromium, `forcedColors: "active"`,
1440×900, populated 5-colour palette):

```
strip segments, collapsed wall:
  { tag: "div", cls: "shrink-0 h-full", onRoster: false, bg: "rgb(255,255,255)", fca: "auto" }  ×5
  stripDistinctBg: [ "rgb(255,255,255)" ]          ← ONE distinct colour, for a 5-colour palette

.watercolor-swatch, same page, same moment:
  { cls: "…watercolor-swatch",                onRoster: true,  bg: "lab(92 88.8 20)",    fca: "none" }
  { cls: "dock-seal-wax watercolor-swatch",   onRoster: true,  bg: "lab(92 88.8 20)",    fca: "none" }
  { cls: "…cursor-pointer watercolor-swatch", onRoster: true,  bg: "rgb(229,83,61)",     fca: "none" }
  watercolorCount: 11
```

The third row is the finding in one line: `rgb(229,83,61)` is `#e5533d`, the **first colour of
Sunset Commons**, rendered faithfully by the `SwatchHoverMenu` `WatercolorDot` inside the expanded
card — 100 px below the wall strip that paints that same colour white.

**The print half.** The roster is reused verbatim at `foundation.css:830–841`. Measured
(`page.emulateMedia({ media: "print" })`):

```
strip segment   → printColorAdjust: "economy"   onRoster: false
watercolor dot  → printColorAdjust: "exact"     onRoster: true
```

`economy` licenses the print engine to drop the background. So the specimen is the one thing on the
plate that is *not* guaranteed ink — directly against `foundation.css:793–799`: *"A color tool's
output is a printable palette: the swatches + hex/space labels printed with faithful ink … for a
color tool the color IS the content."*

**Against canon.** `VISUAL-CONSTITUTION §3` law 8 — *"One pane may have one full-strength visual
protagonist. Supporting fixtures do not compete with it through equal size or equal shadow."* In
WHCM the protagonist is not merely out-competed, it is **absent**, and only fixtures remain.
`VISUAL-CONSTITUTION:84` — *"Focus remains visibly distinct from selection in both schemes, forced
colors and reduced transparency"* — establishes forced colours as a register this design system is
accountable in, not an optional extra. And `PROPORTION-AUDIT:79` requires *"independent nonzero
monochrome/forced-colors deltas"* for the selector's marker; the Browse wall's specimen delta
between two different palettes under forced colours is **zero**.

**Why this is not pass 1's D-20.** Pass 1 D-20 filed forced-colors as INFO, *"unverified, and the
pane ships no treatment."* That is wrong in a way worth correcting: a treatment **does** ship, it is
deliberate, it is 60 lines long, and it names its own intent. The defect is not absence — it is a
**roster omission that inverts the policy's stated purpose on the app's flagship surface.** An
unaudited gap became a measured, reproduced contradiction.

**Reproduction.** `node ./probe/p5-D-modality.mjs`; frame
`./evidence/D-p5-wall-forcedcolors.png`; static half needs no browser — the selector list at
`foundation.css:680–694` provably does not match `div.shrink-0.h-full`.

**Cure.** One roster line, not a per-component patch: put the strip's segments on the existing
roster — `[data-color-surface]` on the `PaletteColorStrip` root (its children inherit
`forced-color-adjust`), which is the roster's own extension point and costs the component nothing.
The whole point of a single named roster is that a new colour-display surface joins it; this one
never did.

---

### D5-02 · MAJOR — activating the pagination trigger by keyboard destroys focus and announces nothing

**Defect.** `BrowsePane.vue:132–144` renders **More from the commons** inside a `v-else-if`, whose
`v-if` sibling (`:125–131`) is the loading-skeleton block. When the request resolves faster than the
branch swap settles, Vue tears down and re-creates the `v-else-if` subtree — a **new** button
element with the same text. Focus does not follow.

**Evidence** (`./probe/p5-D-geometry.mjs`, arm B, Chromium, keyboard `Enter` on the focused trigger):

```
before  { active: "BUTTON", activeName: "More from the commons", isBody: false,
          cards: 3, trigger: 1, loadingBlock: 0, statusRegions: 1 }
t+30ms  { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0, statusRegions: 1 }
t+60    { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0 }
t+120   { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0 }
t+300   { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0 }
t+900   { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0 }
t+2500  { active: "BODY",   isBody: true, cards: 6, trigger: 1, loadingBlock: 0 }
```

Three facts in one transcript:

1. **Focus is destroyed.** `BUTTON` → `BODY` within 30 ms and never recovers. The user's tab
   position is gone: to get back they must re-traverse the dock and the entire wall — now **6** cards
   of individually-tabbable chips instead of 3.
2. **`trigger: 1` throughout.** The button never disappears from the document, so this is *not* the
   "affordance unmounts" story. The count is stable while the *node* is replaced. That is the
   mechanism, and it means adding a `:disabled` state to the button — the obvious patch — would not
   fix it.
3. **`loadingBlock: 0` at every frame.** The designed loading state for pagination (`:125–131`, two
   `variant="developing"` skeletons) **never rendered once**. Against a fast responder the wall goes
   3 → 6 with no intermediate state at all, so the one piece of feedback the design does provide is
   unreachable on a fast connection.

And `statusRegions: 1` before and after — the single region is `My Palettes`'s own empty plate
(`EmptyState.vue:28`, `role="status"`). **Three palettes arrived on the Browse wall and nothing
announced it.**

**Against canon.** `VISUAL-CONSTITUTION §4.1` — *"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value and associated error/status are
explicit."* Here the pending state is not colour-only, it is **nothing at all**, and the completion
has no status. `VISUAL-CONSTITUTION:186` — *"Request-bound skeletons exist only while real work is
in flight"* — is satisfied vacuously and uselessly: the work is never in flight long enough.

**Distinct from prior passes.** Pass 1 D-07 is the *failure* state of load-more (an error path).
Pass 3 D3-09 is that the affordance sits *outside* the `<Transition>`. Neither concerns focus,
announcement, or the branch-swap identity change. Pass 2 D-20 / pass 1 R2.5 establish that the wall
has no status region in general; this is the specific event that proves the cost.

**Reproduction.** `node ./probe/p5-D-geometry.mjs`; or manually: Tab to **More from the commons**,
press Enter, then press Tab — the next focus lands on the first control in the document, not the
next control after the trigger.

---

### D5-03 · MAJOR — the entity card's cartoon caster is clipped on its offset axis; the last card has no caster at all

**Defect.** `PaletteCard.vue:9–19` spends ten lines of comment adopting the producer
`cartoon-surface` register and explicitly declines `overflow-hidden` on the card to protect it:
*"NO overflow-hidden (S.W5-10 / S-15-A): a card-level radius clip rasterizes 1-bit at
compositing-layer bounds."* One level up, `PaletteCardGrid.vue:50–52` reinstates a clip the card
cannot see:

```css
.palette-card-grid { contain: content; }
```

`contain: content` is `layout paint style`. Per CSS Containment, `contain: paint` clips descendant
paint to the element's **padding box**. The card fills that box exactly.

**Evidence — geometry** (`./probe/p5-D-clip.mjs`, Chromium 1440×900, `deviceScaleFactor: 1`):

```
gridContain  = "content"
cardBoxShadow = oklab(… / 0.32) -3px 3px 0 0,
                oklab(… / 0.26) -5px 5px 0 0,
                oklab(… / 0.18) -7px 7px 0 0
grid  = { x: 224, y: 386.7, w: 462, h: 212 }
card0 = { x: 224, y: 386.7, w: 462, h: 100 }
card1 = { x: 224, y: 498.7, w: 462, h: 100 }

slackLeft  = 0.00 px     shadow extent on −X = 7 px   → clipped
slackRight = 0.00 px
grid padding-box bottom = 598.7      last card bottom = 598.7
bottom slack, LAST card = 0.00 px    shadow extent on +Y = 7 px   → clipped
```

**Evidence — measured pixels, controlled two-sample.** Same frame, same card, same shadow; the two
samples differ only in which axis they probe. `paneGround` is sampled 14 px left of the grid, where
no shadow can reach, as the zero:

```
LEFT axis (slack 0 → must be clipped)          BOTTOM gutter (slack 12 px → must paint)
  dx=-1   rgb(244,183,213)  lum 198.1            dy=+1   rgb(131,100,101)  lum 106.7
  dx=-2   rgb(244,183,213)  lum 198.1            dy=+3   rgb(168,131,137)  lum 139.3
  dx=-4   rgb(244,183,213)  lum 198.1            dy=+5   rgb(209,163,175)  lum 173.6
  dx=-6   rgb(244,183,213)  lum 198.1            dy=+7   rgb(244,191,208)  lum 203.5
  dx=-8   rgb(244,183,213)  lum 198.1            dy=+10  rgb(244,191,208)  lum 203.5
  dx=-12  rgb(244,183,213)  lum 198.1
paneGround rgb(244,183,213) lum 198.1

Δluminance, left axis   = 0.0   over 12 px      Δluminance, gutter = 96.8 over 7 px
```

The gutter ramp `106.7 → 139.3 → 173.6 → 203.5` is the three-layer caster resolving over exactly its
3/5/7 px steps — the shadow demonstrably paints when it has room. On the left axis, across 12 px,
**not one pixel differs from bare pane ground.** The horizontal leg does not exist.

**The design consequence, stated in design terms.** A cartoon caster reads as a solid slab offset in
one direction; it is what tells the eye the plate is lifted and where the light is. Clip one axis
and the remaining leg reads as a **bottom rule** — a horizontal divider — not a cast. That is why
the wall in `./evidence/D-p5-wall-normal.png` reads as a stack of underlined rows rather than a set
of lifted plates: the register was chosen and then half-deleted by an ancestor. And because the last
card's bottom slack is also `0.00`, **the same wall shows two different treatments**: cards 1..*n*−1
carry a bottom rule, card *n* carries nothing.

**Against canon.** `VISUAL-CONSTITUTION §3` law 8 forbids fixtures competing with the protagonist
*"through equal size or equal shadow"* — a shadow grammar that is per-position rather than
per-role makes that law unstateable, because the same card renders two different shadows depending
on where it sits in the list. `VISUAL-CONSTITUTION:186` — *"Saved palettes are matte specimen slips
inside a glass workspace, not cartoon casters stacked within casters"* — and this component both
stacks casters (pass 1 R2.3, pass 2 D-02, pass 4 concurrence) **and** truncates the one it stacks.

**Distinct from prior passes.** Pass 1 R2.3 / pass 2 D-02 / pass 4's concurrence row count the
caster *layers* on the plate. None of them observed that the entity caster is geometrically
incapable of painting, or measured its clip. This is a different mechanism (`contain: paint` on an
ancestor) with a different cure.

**Reproduction.** `node ./probe/p5-D-clip.mjs`.

**Cure.** The containment is a real performance intent, so the cure is not "delete `contain`". It is
that a plate whose register is an *offset* caster must not be flush against a paint-clip boundary —
either the grid drops to `contain: layout style` (keeping the layout isolation, losing the clip), or
the card's caster becomes a symmetric/inset register that lives inside its own border box. Choosing
`cartoon-surface` at `PaletteCard.vue:19` and `contain: content` at `PaletteCardGrid.vue:51` are two
decisions that cannot both be right.

---

### D5-04 · MAJOR — the empty invitation's CTA slot is plumbed, wired, and unused; the invitation is prose naming a place with no way to go there

**Defect.** `BrowsePane.vue:80–91` renders the true-empty plate with three strings and no action:

```
:empty="displayedBrowse.length === 0"
empty-eyebrow="· the commons ·"
empty-text="No published palettes here yet."
empty-hint="Publish one from My Palettes and start the wall."
```

The hint is an **instruction to travel** — and there is nothing to travel with. Meanwhile the
**error** arm 15 lines above (`:68–77`) gets a real, focusable `Button`:

```html
<template #action>
    <Button variant="outline" size="sm" class="font-display" @click="pm.loadRemotePalettes()">Retry</Button>
</template>
```

**Evidence — the slot exists and is already threaded end-to-end.** `PaletteCardGrid.vue:28–30`:

```html
<template v-if="$slots.emptyAction" #action>
    <slot name="emptyAction" />
</template>
```

and `EmptyState.vue:64` terminates it (`<slot name="action" />`). So the affordance requires no new
component, no new prop, no new file — only a `<template #emptyAction>` at the call site, which is
never written. Confirmed by grep over the consumer:

```
$ grep -n "emptyAction" demo/palettes/BrowsePane.vue
(no output)
```

**Against canon.** `VISUAL-CONSTITUTION:44`, the Browse row of the §3.1 table, requires the
*"primary empty invitation content-hugs"* — an invitation, not a notice. `VISUAL-CONSTITUTION:186`
— *"A true empty invitation content-hugs its text/action …"* — pairs *text* with *action*, and
`PaletteCardGrid.vue:19` records the ruling in its own comment: *"The CTA slot survives on the
caption."* It survived in the primitive and died at the call site.

**Why this is not pass 1's D-06 / pass 3's D3-07.** Those establish that the plate **lies** — it
says the commons is empty when the wall is merely filtered. This finding holds even when the plate
is telling the truth: on a genuinely empty commons, the one designed state whose entire job is to
recruit a first contribution ships with its recruitment control unbuilt, while the failure state next
to it is fully equipped. That asymmetry is a hierarchy inversion: the design invests its only
affordance in the path the user cannot fix and withholds it from the path they can.

**Reproduction.** Static: `BrowsePane.vue:80–91` versus `:68–77`, and the unused slot at
`PaletteCardGrid.vue:28–30`. Live: the frame `./challenge-D-design-pass4.md`'s
`D-p4-filtered-zero.png` shows the plate with no control in it.

---

### D5-05 · MINOR — four type sizes in one 30 px metadata row, centre-aligned, so nothing shares a baseline; one of the four is unauthored

**Defect.** The card's identity line and its chips are laid out `flex items-center`
(`PaletteCard.vue:43`), and instantiate four distinct computed font sizes in a 30.5 px band.

**Evidence** (`./probe/p5-D-geometry.mjs`, desktop 1440, one card, `metaRowAlign: "center"`):

| element | class authored | computed `font-size` | rect top → bottom |
|---|---|---:|---|
| `Sunset Commons` | `font-display font-medium text-subheading` (`PaletteCard.vue:55`) | **20.352 px** | 415.4 → 445.9 |
| vote `<button>` | *(no type class)* (`PaletteCardMeta.vue:43–45`) | **18.608 px** | 417.2 → 444.2 |
| colour count / vote count | `text-mono-small` (`PaletteCardMeta.vue:53`) | **16.400 px** | 417.6 → 443.7 |
| fork · version · tag chips | `text-micro` (`PaletteCardMeta.vue:9,18,28,39`) | **11.000 px** | 423.8 → 437.5 |

```
distinct computed sizes in one row: ["20.352px", "18.608px", "16.4px", "11px"]
alignItems: "center"
```

Two things follow. First, `items-center` on four sizes means the row has **no shared baseline** — the
11 px chips float 8.4 px inboard of the identity's box on both edges, so the eye gets four
independent optical centres instead of one line of text. Second, the **18.608 px is unauthored**: the
vote `<button>` at `PaletteCardMeta.vue:43–45` carries no type class at all, so it inherits a size
from an ancestor and its child `<span>` then resets to 16.4 px. Three rungs were chosen; the fourth
is a leak.

**Against canon.** `VISUAL-CONSTITUTION §4` assigns one role per rung — palette identity to
`--type-subheading`/Fraunces, *"value, code, or provenance"* to `text-mono-small`. A row that
instantiates four rungs simultaneously has no hierarchy: everything is a peer, which is the measured
form of the "six-species jumble" pass 4 described qualitatively. `PROPORTION-AUDIT §5.2` — *"A card
has one protagonist, one identity line, and at most one persistent action/status region"* — is
breached on the *type* axis as well as the region-count axis pass 4 D4-02 measured.

**Reproduction.** `node ./probe/p5-D-geometry.mjs` → `geometry.metaChildren`.

---

### D5-06 · MINOR — the pane names its own subject four different ways in one file

**Defect.** One object — the set of published palettes — is called four things across seven strings
authored in `BrowsePane.vue`:

| line | string | noun |
|---|---|---|
| `:3` | `description="Discover palettes from the community."` | **the community** |
| `:13` | `placeholder="Search the commons..."` | the commons |
| `:65` | `message="The commons is unreachable."` | the commons |
| `:84` | `empty-eyebrow="· the commons ·"` | the commons |
| `:85` | `empty-text="No published palettes here yet."` | **published palettes** |
| `:86` | `empty-hint="Publish one from My Palettes and start the wall."` | **the wall** |
| `:142` | `More from the commons` | the commons |

The pane header — the first line a visitor reads, and the one that sets the register — is the single
string that does **not** say *commons*. And *"the wall"* appears in exactly one user-visible string
while being the term the source comments use throughout (`:29`, `:41`, `:86`, `:121`), so the
internal vocabulary has leaked into copy at one site and nowhere else.

**Evidence.** The seven lines above, and the rendered count on a populated wall
(`./probe/p5-D-geometry.mjs` → `lexicon`), which finds `community: 1, commons: 2` co-present in one
viewport — the header and the field disagree with each other on screen simultaneously.

**Against canon.** `VISUAL-CONSTITUTION §3.1`'s Browse row names the surface a *"discoverable public
specimen field"* and its content *"results"*; `:186` requires that owner states be *"explicit,
non-interchangeable"*. Four interchangeable nouns for one object is the copy-register form of the
same defect: a visitor cannot tell whether *the commons*, *the community* and *the wall* are one
place or three, and the empty plate's instruction (`Publish one from My Palettes and start the
wall`) asks them to act on the one noun that appears nowhere else in the UI.

**Severity.** MINOR — it is a lexicon defect, not a broken state; but it is the header string, so it
is the highest-visibility one in the component.

**Reproduction.** Static, the seven lines cited.

---

## 4. Concurrence — independently re-derived at my own coordinates

Recorded so these no longer rest on one or two seats. **Not re-reported as findings.**

| prior finding | my independent coordinate |
|---|---|
| the equal-card matrix (pass 2 D-05) | measured `gridRect.w = 462` inside a Browse pane of 462 px content width at 1440; the companion `My Palettes` holds the mirror half **while empty**. §3.1 demands 64–66.67 % for the field |
| the field wears a `Card` §3.1 forbids (pass 2 D-01) | `BrowsePane.vue:2` — `<Card tier="resting" class="pane-scroll-fade … h-full">`; §3.1 Browse row: *"the field/empty/inspector have none"* |
| the expanded double-specimen (pass 2 D-14) | `./evidence/D-p5-wall-forcedcolors.png` — and D5-01 upgrades it: the duplicate is the **only** copy that survives WHCM and print, so the two copies now differ in accessibility contract, not just redundancy |
| the specimen is `aria-hidden` (pass 2 D-15) | `PaletteColorStrip.vue:3–5` — `aria-hidden="true" role="presentation"`. Compounds D5-01: in WHCM the specimen is invisible to the eye *and* absent from the AT tree, so it has no representation in any modality |
| five persistent regions where §5.2 allows one (pass 4 D4-02) | measured on the metadata row: colour count, fork count, tag chip, vote button, `···` menu — plus D5-05's finding that they occupy four type rungs |
| `.search-seated` per-instance override (pass 1 D-14 / pass 2 D-26 / pass 4 D4-07) | **sharper coordinate**: glass-ui 7.0.0's variant enum is exactly `inline \| bare \| floating` (`node_modules/@mkbabb/glass-ui/dist/components/search/searchVariants.d.ts:3–8`). There is no `seated` rung, so the booked ASK-D swap provably did not ship. Pass 4's conclusion is CONFIRMED from the type declaration rather than a filename grep |
| the wall has no status region (pass 1 R2.5 / pass 2 D-20) | measured `statusRegions: 1` on the whole document, and the one region belongs to `My Palettes`. D5-02 is the event that shows the cost |

---

## 5. Negative proofs — what I attacked and could not break

1. **`BrowsePane`'s own motion is tokenized and PRM-correct.** `<Transition name="vj-morph">`
   (`:40`) keys one of the three sanctioned families; the family is defined centrally in
   `demo/styles/animations.css:104–139` against `--duration-fast` / `--spring-snappy`, not ad hoc in
   the component (owner edict 6 satisfied). The global guard at `animations.css:184–193` sets
   `transition-duration: 0.01ms !important` on `*`, which neutralises it under
   `prefers-reduced-motion: reduce`. **Not a finding.**
2. **The morph does not animate a layout-forcing property in practice.** `vj-morph` *can* transition
   `max-height` (`animations.css:108`, `:122`), which would force layout — but only via
   `--vj-morph-collapse` / `--vj-morph-expanded`, and `BrowsePane.vue:40` sets neither. Both resolve
   to `none`, and `none → none` is not an animatable pair. The animated properties are `opacity` and
   `transform` only. **Not a finding** — and this is the mechanism that makes pass 4's D4-06 precise:
   the blunt global guard works by capping `animation-duration`/`transition-duration`, which
   structurally *cannot* reach `PaneHeader`'s `animation-timeline: scroll()` motion, because a
   scroll-progress animation is not time-driven. D4-06 stands; `animations.css:79`'s claim that the
   guard *"neutralises all three"* is true of the three Vue families and silent about the fourth
   mechanism.
3. **The colour strip does carry its corner radius.** `PaletteCard.vue:31–32` claims the strip
   *"carries the corner radius itself now that the card no longer clips"*; `PaletteColorStrip.vue`
   declares no `rounded-*` of its own, which looked like a broken promise. It is not: the parent
   passes it at `PaletteCard.vue:36` (`:class="… 'rounded-t-card'"`) and Vue merges the fallthrough
   class onto the array-bound root. Measured: `strip.borderRadius = "16px 16px 0px 0px"`,
   `overflow: hidden`. **Not a finding.**
4. **The accented `My Palettes` title beside a plain `Browse` is owner-ruled, not a defect.** The two
   co-visible peer H3s render in different chromatic registers — `PalettesPane.vue:15` wraps a
   `.palettes-ramp-text` span, `BrowsePane.vue:3` passes bare text. This looked like a per-instance
   override of a root (edict 5). It is a ratified single-instance exception, recorded at
   `PalettesPane.vue:8–9`: *"the ONE Q4-record moment surviving, relocated per the ruled form; every
   OTHER pane title stays ink (S.W5-7 stands for the rest)."* I do not born-RED a ruled decision.
   **Not claimed.**
5. **`verbatimModuleSyntax` is clean.** `BrowsePane.vue:197` is `import type { Palette, Tag }`; every
   other import at `:179–199` is value-only. **Not a finding.** (Concurs with pass 4 §5.3.)
6. **Environment correction — pass 4's misconfig premise does not hold here.** Pass 4 §1 states the
   loopback origin *"latches `detectDevMisconfig` … so no request is issued"* and built a LAN-origin
   apparatus to escape it. Measured on this server: `VITE_API_URL` **is** set (`BASE_URL` resolves to
   `http://localhost:3000`, not `client.ts:36`'s `DEFAULT_REMOTE_API_URL`), and
   `detectDevMisconfig` returns `false` on its first line when it is —
   `availability.ts:112`: `if (i.viteApiUrlSet) return false;`. The latch cannot fire. The observed
   loopback console is:

   ```
   [error]   Access to fetch at 'http://localhost:3000/palettes?limit=50&sort=newest' from origin
             'http://10.152.11.41:9000' has been blocked by CORS policy
   [warning] Failed to load remote palettes: ApiUnavailableError: Backend unreachable — working locally.
   ```

   So on **this** configuration the error species reaching the pane is `ApiUnavailableError`, and the
   plate's headline *"The commons is unreachable."* is **correct** for it. Pass 3's D3-05 (the pane
   discards the transport's error species) and pass 4's concurrence row on it are sound only for the
   `DevMisconfigError` arm, which requires `VITE_API_URL` unset. **This narrows the arm, not the
   finding** — `useBrowsePalettes.ts:79` still overwrites every species with the constant
   `"Failed to load palettes"`, which I re-derived at my own coordinates.
7. **The `"♡ 0"` in two of my frames is my stub's bug.** `votes` vs `voteCount`
   (`demo/palettes/types.ts:38`). Named in §1 and here so it cannot be mistaken for evidence; no
   finding rests on it.

---

## 6. The gestalt cure this pass adds

Passes 2–4 own the chassis transposition, the typed-error/typed-empty cure, and the
card-becomes-a-control transposition. All three stand. This pass adds one that is orthogonal to all
of them and lands independently:

**The Browse wall must be accountable in every register the design system already declares, and the
registers must be declared where they can be seen.**

Three of this pass's findings are one mechanism: *a policy exists, is centrally declared, and the
Browse specimen is not enrolled in it.*

- `foundation.css` declares a colour-surface roster **by name** so the enrolment is a one-line
  decision — and the wall's specimen is the one colour-display surface in the app that never joined
  (D5-01). The cure is `[data-color-surface]` on the `PaletteColorStrip` root, which fixes both the
  forced-colors and the print arm at once because the roster is shared.
- `PaletteCardGrid` declares `contain: content` for performance and `PaletteCard` declares an
  offset caster for register; neither can see the other, so the register loses (D5-03). The cure is
  to pick one — symmetric caster, or `contain: layout style`.
- `PaletteCardGrid` declares an `emptyAction` slot and `EmptyState` terminates it; the call site
  never uses it (D5-04). The cure is one `<template #emptyAction>`.

None of these is a new component, a new directory, or a wrapper — each is an enrolment in machinery
that already exists, which is what edicts 1, 3 and 4 ask for. And the ordering matters: **D5-01
first**, because until it lands, every other visual judgement about this wall is a judgement about a
surface that shows no colour to some of its users.

D5-02's cure is the one that needs a decision rather than a line: pagination that replaces its own
trigger node must either move focus deliberately (to the first newly-arrived card) or keep the
trigger's identity stable across the branch swap — and the wall needs the polite status region pass 2
D-20 already asked for, so "3 more palettes" is announced rather than silently appended.

---

## 7. Evidence index

| artifact | what it establishes |
|---|---|
| `./probe/p5-D-modality.mjs` | the forced-colors and print arms; the roster membership read; the load-more focus first cut |
| `./probe/p5-D-geometry.mjs` | `contain`/slack geometry, the metadata-row type rungs and baselines, the lexicon count, the completed load-more focus transcript |
| `./probe/p5-D-clip.mjs` | the controlled two-sample pixel measurement of the clipped caster (PNG decoded back into a canvas and sampled) |
| `./evidence/D-p5-wall-forcedcolors.png` | **the headline frame** — the commons with no colours, beside decoration that kept its own |
| `./evidence/D-p5-wall-normal.png` | the normal-register baseline |
| `./evidence/D-p5-wall-print.png` | the `@media print` arm |
| `./evidence/D-p5-clip-wall.png` | the frame the caster samples come from |
| `./evidence/D-p5-modality.json` · `D-p5-geometry.json` · `D-p5-clip.json` | raw probe output |
| `./challenge-D-design-pass4.md` | the prior pass, preserved verbatim |

---

## 8. Findings summary

| id | severity | finding |
|---|---|---|
| **D5-01** | BLOCKER | under `forced-colors: active` a 5-colour palette renders `stripDistinctBg: ["rgb(255,255,255)"]` — the wall's specimen is off `foundation.css`'s colour-surface roster while the aurora, the empty-plate ghosts and the expanded card's duplicate swatches are on it; the same omission gives the specimen `printColorAdjust: "economy"` vs `"exact"`, so the wall does not print |
| **D5-02** | MAJOR | keyboard-activating **More from the commons** moves focus `BUTTON → BODY` and never restores it; `trigger: 1` throughout (node replaced, not removed) and `loadingBlock: 0` at every frame — the designed pagination skeleton never renders, and 3 new cards arrive with `statusRegions: 1`, none of them Browse's |
| **D5-03** | MAJOR | `contain: content` on `.palette-card-grid` clips the entity card's `-3/-5/-7px` cartoon caster: left-axis Δluminance **0.0** over 12 px vs bottom-gutter Δluminance **96.8** over 7 px, `slackLeft = 0.00`; the last card's bottom slack is also `0.00`, so card *n* has no caster while cards 1..*n*−1 have half of one |
| **D5-04** | MAJOR | the true-empty invitation's `#emptyAction` slot is plumbed through `PaletteCardGrid.vue:28–30` to `EmptyState.vue:64` and never used; the empty state's only "action" is prose naming `My Palettes`, while the error state 15 lines above gets a real `Button` |
| **D5-05** | MINOR | four computed type sizes — `20.352 / 18.608 / 16.4 / 11 px` — in one 30.5 px `items-center` row, so nothing shares a baseline; the `18.608 px` is unauthored, inherited by an unclassed `<button>` at `PaletteCardMeta.vue:43` |
| **D5-06** | MINOR | one object, four nouns across seven authored strings — *the community* (`:3`, the header), *the commons* (`:13, :65, :84, :142`), *published palettes* (`:85`), *the wall* (`:86`) |

**Corrections carried, not new findings:** pass 1 D-20 (forced-colors "unverified, no treatment")
is superseded by D5-01 — the treatment exists and the specimen is omitted from it; pass 4's
misconfig-latch reproduction premise does not hold on this configuration (§5.6), which narrows the
arm of pass 3's D3-05 without touching the finding.

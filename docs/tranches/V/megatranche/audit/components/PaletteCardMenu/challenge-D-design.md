# CHALLENGE-D — PaletteCardMenu: the design is flawed (PASS 3)

Seat: CHALLENGE-D (design axis) · pass 3 · 2026-07-28
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`).

Prior passes preserved verbatim:
`challenge-D-design.pass-1-2026-07-28.md` (D-1…D-25) and
`challenge-D-design.pass-2-2026-07-28.md` (P2-1…P2-16).
Those 41 findings stand. This pass went where neither looked — **the canon-named
320 px arm, the accessibility media arms with the menu actually open, the real
accessibility tree, and the modal barrier the component imposes on the page** —
and re-instrumented the one prior measurement whose instrument was wrong.

---

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm,
the tier explicitly declared at spawn. The seat is declared, not inherited. **No defect on this axis.**

---

## Verdict

**DEFECTIVE — pass 3 adds 3 BLOCKER, 5 MAJOR, 4 MINOR/INFO on top of the prior 41.**

Pass 1 argued the component should not exist. Pass 2 proved the card cannot afford it at
390 px. Pass 3 found the two things that make the argument physical rather than
compositional, and one that makes it categorical:

> **At 320 px the colour-count badge renders on top of this component's trigger glyph.**
> Photographed at `evidence/pass3-card-row-320.png`: the palette has no name, the "Featured"
> badge takes 59.4 % of the row, and the `5` chip sits *over* the `⋯`, whose three dots bleed
> out from behind it. The version chip is pushed past the card's right edge.

> **While the menu is open, every palette card — including the one the menu belongs to — is
> removed from the accessibility tree, and the menu's own computed name is the string
> "Palette menu", identical on every card in the field.** A screen-reader user cannot determine
> which palette they are about to delete. Measured in the real AX tree, not inferred.

> **The reason an action is unavailable renders between 1.81 : 1 and 1.96 : 1 in _all five_
> rendering arms — light, dark, `prefers-contrast: more`, `prefers-reduced-transparency: reduce`
> and `forced-colors: active`.** Every accessibility escape hatch the platform offers moves it by
> ≤ 0.15 while moving the text beside it to 21 : 1. `opacity` is not a colour; nothing overrides it.

The strongest single new defect is **P3-1** (AT identity annihilation). The most photogenic is
**P3-2** (the trigger collision). The most systemic is **P3-4**.

---

## Method and probe log

**Static.** Re-read the SFC; `PaletteCard.vue`; `demo/palettes/utils.ts`;
`demo/platform/transport/availability.ts`; `demo/ui/dropdown-menu/index.ts`;
`demo/styles/foundation.css` (the menu token block, `:95-140` and `:445`);
**all five `DropdownMenu` consumers in the app** — `MobileMenuDropdown.vue`,
`ProfileSection.vue` ×2, `UserSortMenu.vue`, and this file; `SearchFilterBar.vue`;
the compiled glass-ui 7.0.0 `dist/components/dropdown-menu/`; the three canon documents.

**Visual.** Read `shots/safari-desktop-light/palettes.png` and
`shots/safari-mobile-dark/browse.png` with my own eyes (both confirm the prior passes' evidence
gap — the matrix photographed no palette card on either route), then captured and read six new
frames of my own.

**Live.** Chromium/Playwright against `http://localhost:9000`, store seeded
`{version:1,palettes:[…]}` (the shape `usePaletteStore` accepts). Arms: 1440×1000 light and dark,
1440×800 with 11 palettes, **320×844** and 390×844 touch at DPR 2–4, `prefers-contrast: more`,
`prefers-reduced-transparency: reduce` (via CDP `Emulation.setEmulatedMedia` — Playwright's
`emulateMedia` has no such key), `forced-colors: active`, and the CDP `Accessibility` domain.

| artefact | contents |
|---|---|
| `probe-D10-pass3.mjs` / `-results.json` | modal side-effects, the 320 px arm, menu/trigger AT names |
| `probe-D11-pass3.mjs` / `-results.json` | **polarity-agnostic** rendered-pixel contrast × 5 arms; scroll lock |
| `probe-D12-pass3.mjs` / `-results.json` | data-dependent surface (dark vs light neighbour); **real wheel gesture** |
| `probe-D13-pass3.mjs` / `-results.json` | **row-by-row** composited background under the menu header |
| `probe-D14-pass3.mjs` / `-results.json` | **CDP AX tree** — computed names of the menu and of the annotated rows |
| `probe-D15-pass3.mjs` | `aria-hidden` before/after, ancestor chain |
| `probe-D16-pass3.mjs` / `-results.json` | the 320/390 metadata-row overrun arithmetic |
| `evidence/pass3-card-row-320.png` | **the badge on top of the trigger** |
| `evidence/pass3-320-submenu.png` | the submenu erasing its own parent at 320 |
| `evidence/pass3-390-submenu.png` | the same at 390 |
| `evidence/pass3-{light,dark,contrast-more,reduced-transparency,forced-colors}.png` | the five contrast arms |
| `evidence/pass3-rowscan-{black,white}.png` | the header band over a black vs white neighbour |

---

## The new findings

### P3-1 · BLOCKER · While the menu is open the palette field leaves the accessibility tree, and the menu's own name is a generic string identical on every card

Three measurements compose into one defect.

**(a) The owning card is hidden.** `probe-D15-pass3.mjs`, before vs after opening one card's menu:

```
BEFORE totalAriaHiddenTrue: 33
  ancestor chain of the palette card, hidden nodes: []
AFTER  totalAriaHiddenTrue: 50
  ancestor chain of the palette card, hidden nodes:
  ["DIV.pane-wrapper pane-wrapper--right w-full  aria-hidden=true data-aria-hidden=true"]
```

No ancestor of the card is hidden at rest. Opening the menu marks the whole `My Palettes` pane
`aria-hidden="true"` (reka's modal `hideOthers`; `data-aria-hidden` is that library's marker).
Seventeen further nodes join the hidden set.

**(b) The menu's computed name carries no identity.** CDP `Accessibility.getFullAXTree`
(`probe-D14-pass3-results.json`):

```json
"menus": [ { "role": "menu", "name": "Palette menu",
             "nameFrom": ["relatedElement:aria-labelledby"] } ]
```

It resolves to the trigger. Every trigger in the field carries the same string
(`probe-D10-pass3-results.json`):

```json
"triggerNames": [
  { "ariaLabel": "Palette menu", "id": "reka-dropdown-menu-trigger-v-1-2" },
  { "ariaLabel": "Palette menu", "id": "reka-dropdown-menu-trigger-v-1-3" },
  { "ariaLabel": "Palette menu", "id": "reka-dropdown-menu-trigger-v-1-4" } ]
```

**(c) The one element that *does* spell the identity is programmatically inert.** The
`DropdownMenuLabel` at `:9-11` renders the palette name and is referenced by nothing:

```json
"paletteNameLabelReferenced": {
  "id": null, "text": "Muted Terracotta and Deep Sea Foam Study", "referencedBy": 0 }
```

**Consequence.** The AT transcript for opening any card's menu is *"Palette menu, menu"* — then
`Delete`. The visible name is a bare text node inside; the card that would have disambiguated it
has just been hidden. There is no state in which an assistive-technology user can establish which
palette this menu destroys.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: *"Role, accessible name, state/value and associated
error/status are explicit."* `§5.1`, overlay row: *"overlay title/description/state on open."*
`PROPORTION-AUDIT.md §5` law 5: every mark is *data, status, labeled action…* — a labelled action
whose scope is unnameable is none of them.

**Reproduction.** `node docs/…/PaletteCardMenu/probe-D15-pass3.mjs` and `probe-D14-pass3.mjs`
with the dev server up.

**Cure (gestalt).** This is the same transposition the prior passes ordered, arriving from a new
direction. The inspector is a *named region of the page*, not an anonymous transient overlay: it
carries the palette's identity as its own heading, it does not hide the field to exist, and the
action that destroys the entity is announced next to the entity's name. A per-card overlay cannot
be made to do this without inventing an `aria-label` that duplicates the identity a third time.

---

### P3-2 · BLOCKER · At 320 px the colour-count badge renders on top of this component's trigger

`evidence/pass3-card-row-320.png` is the witness. The whole card row reads:

```
⣿      🏅 Featured   (5 over ⋯)   ⏱…   ← clipped at the card edge
```

Measured (`probe-D16-pass3-results.json`, 320 px):

```json
"groupRect": { "right": 211 },  "groupOverflow": "visible",  "cardOverflow": "visible",
"kids": [ { "tag":"svg",  "x":47,  "right":63,    "w":16   },      // drag handle
          { "tag":"SPAN", "x":71,  "right":71,    "w":0    },      // the palette identity
          { "tag":"DIV",  "x":79,  "right":227.4, "w":148.4},      // "Featured" badge
          { "tag":"DIV",  "x":235.4,"right":268.3,"w":32.9 },      // colour count "5"
          { "tag":"SPAN", "x":276.3,"right":297.1,"w":20.8 } ],    // version chip
"trigger": { "x": 219, "right": 273, "w": 54 },
"lastKidRight": 297.1, "overrunsGroupBy": 86.1, "collidesWithTrigger": true
```

The `min-w-0` flex arm is 164 px wide; its five `shrink-0` children need 242 px. Nothing clips —
`PaletteCard.vue:17-19` deliberately declares *"NO overflow-hidden"* — so the badges simply run
**86.1 px past the end of their own box**, straight through the 54 px column this component's
trigger occupies. The `5` badge spans 235.4–268.3; the trigger spans 219–273. They overlap by
33 px, and in the frame the `⋯` glyph is visibly emerging from behind the `5`. The version chip
ends at 297.1 — **24.1 px past the trigger's own right edge**, hanging off the card.

The same collision exists at 390 px, smaller: `overrunsGroupBy: 16.1`, version chip 276.3–297.1
crossing the trigger's left edge at 289.

**This is not a truncation defect; it is two controls occupying the same pixels.** Pass 2's P2-1
measured the identity at 0 px and read that as the protagonist yielding. The photograph shows the
next thing that happens once the protagonist has yielded everything it has: the *support* elements
begin overwriting the *action* element.

`PROPORTION-AUDIT.md §5` law 2 (one protagonist, one identity line), law 7 (*"Visual glyph size,
operable target size and layout reservation are separate quantities"* — here the reservation is
zero while the glyph is 54 px), and law 8 (rendered relation over token intent) are all violated
in one frame.

**Reproduction.** `node docs/…/PaletteCardMenu/probe-D16-pass3.mjs`.

---

### P3-3 · BLOCKER · Opening one card's menu freezes the whole palette list — a real wheel gesture moves it 0 px

`probe-D10-pass3-results.json`, desktop 1440, before vs after opening one card's menu:

| | before | after |
|---|---|---|
| `body { overflow }` | `visible` | **`hidden`** |
| `body { pointer-events }` | `auto` | **`none`** |
| body children with `aria-hidden="true"` | 0 | **7** |

Pass-3's first attempt used programmatic `scrollTop`, which bypasses hit-testing and proves
nothing. The honest instrument is a real wheel gesture at the centre of the list
(`probe-D12-pass3-results.json`, 1440×800, 11 palettes, list scroller 1556 px of content in a
686 px viewport):

```json
"wheel": {
  "centre": { "x": 985, "y": 440 },
  "closed":   { "before": 0, "after": 400, "delta": 400 },
  "menuOpen": { "before": 0, "after": 0,   "delta": 0, "menuStillOpen": true }
}
```

**400 px of scroll with the menu closed; 0 px with it open** — and the menu does not even close in
response, it simply eats the gesture. With 11 palettes the user can see 686 px of a 1556 px list;
while any card's menu is open the other 870 px are unreachable.

**Design reading.** A modal barrier is the correct behaviour for a *dialog*. This is a secondary,
per-row affordance that appears once per palette — potentially dozens per screen — and each one
claims the whole workspace: scroll frozen, page non-interactive, field removed from the AT tree
(P3-1). `VISUAL-CONSTITUTION.md §5.1`, Popover row: *"preserve underlying document scroll."*
The component takes the producer's default `modal` and never reconsiders it; nothing in
`PaletteCardMenu.vue` mentions modality at all.

---

### P3-4 · MAJOR · The degraded-state reason is unreadable in all five rendering arms — every accessibility escape hatch moves it by ≤ 0.15

Pass 2 (P2-3) measured 1.75 : 1 in light and stopped. This pass ran the same measurement across
every arm the platform provides, with a **polarity-agnostic** sampler (surface := the modal pixel
in the box; ink := the pixel furthest from it in luminance), so the same instrument is valid in
light, dark and forced colours. `probe-D11-pass3-results.json`:

| arm | `offline` annotation | `Rename` | `Delete` | header | Δ(Delete,Rename) |
|---|---|---|---|---|---|
| light | **1.81 : 1** | 14.13 | 14.24 | 5.30 | 1 |
| dark | **1.94 : 1** | 7.44 | 7.44 | 5.20 | **0** |
| `prefers-contrast: more` | **1.81 : 1** | 14.82 | 14.93 | 5.53 | 1 |
| `prefers-reduced-transparency: reduce` | **1.82 : 1** | 16.20 | 16.32 | 6.08 | 1 |
| `forced-colors: active` | **1.96 : 1** | **21.00** | **21.00** | **21.00** | **0** |

Each arm was asserted live before sampling (`mediaCheck`), e.g. forced colours:

```json
"mediaCheck": { "forcedColors": true, "prefersContrastMore": false, "darkClass": false }
"annotationStyles": { "opacity": "0.55", "parentOpacity": "0.5",
                      "color": "rgb(0, 0, 0)", "effectiveAlpha": 0.275 }
```

**The mechanism, stated exactly.** glass-ui honours every arm correctly — measured on the same
panel:

| arm | menu surface | backdrop-filter |
|---|---|---|
| light | `oklab(0.936 … / 0.808)` | `blur(11px) saturate(1.6)` |
| `prefers-contrast: more` | `… / 0.9808` | **`blur(1.1px)`** |
| `prefers-reduced-transparency` | **`rgb(253,245,236)`** (opaque) | **`none`** |
| `forced-colors` | `rgb(255,255,255)` | `blur(0px)` |

The producer is not at fault. The consumer's `opacity-55` (`:37`, `:57`) multiplying inside
glass-ui's `[data-disabled]{opacity:var(--opacity-disabled)}` yields `0.5 × 0.55 = 0.275`, and
**`opacity` is a compositing operation, not a colour** — `forced-colors` rewrites `color` to
`CanvasText` (measured: `rgb(0,0,0)`) and the annotation still composites to `rgb(185,185,185)`
on `rgb(255,255,255)`.

**The gap widens exactly where it should close.** Reason-vs-label contrast ratio:
light `14.13/1.81 = 7.8×`; dark `3.8×`; **forced colours `21.00/1.96 = 10.7×`**. In the mode a
user enables *because they cannot read low-contrast text*, this component's explanation of why an
action is unavailable becomes the most under-contrasted thing on screen relative to its neighbours.

`VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier"* and *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency."* Both name these exact arms.

**Cure.** An availability reason must not live inside the element that `[data-disabled]` dims.
Either it is a sibling outside the row (producer seam: `DropdownMenuItem` should expose a
`reason`/`description` slot rendered at full ink), or — per D-1 — it is durable operation state in
the inspector, which is where the canon already put it.

---

### P3-5 · MAJOR · The menu's own text contrast is a function of the user's neighbouring palette colours

`align="end"` with the producer's default side drops the panel down the list, so its header band
composites over the **next** palette's full-bleed colour strip. The panel is `alpha 0.808` with
`blur(11px)`. Row-by-row scan of the composited background under the header band, header ink held
at its computed `rgb(112,89,66)` (`probe-D13-pass3-results.json`, 1440, DPR 4, identical geometry
in both arms — menu `y 610.3`, neighbour card `y 630.1`):

| y (px into panel) | neighbour = near-black | contrast | neighbour = near-white | contrast |
|---|---|---|---|---|
| 8 | `rgb(233,221,213)` | 4.93 | `rgb(237,225,216)` | 5.12 |
| 16 | `rgb(226,214,206)` | 4.61 | `rgb(239,227,218)` | 5.22 |
| 24 | `rgb(214,204,197)` | **4.16** | `rgb(241,230,223)` | 5.36 |
| 30 | `rgb(206,196,190)` | **3.84** | `rgb(242,233,226)` | 5.48 |
| 38 | `rgb(199,190,184)` | **3.59** | `rgb(244,235,229)` | 5.59 |

*(the `y=22` row of the black arm returned contrast 1.00 — on that row the glyph strokes are the
modal pixel; it is a scan artifact and is excluded.)*

**Band contrast: 3.59 – 4.93 : 1 with a dark neighbour; 5.12 – 5.59 : 1 with a light one.** The
header is 14.384 px — not large text — so 4.5 : 1 applies, and **eight of the sixteen sampled rows
fall below it purely because the user's next palette is dark**. The swing is 1.56×, and it is
driven by nothing the designer controls.

`VISUAL-CONSTITUTION.md §4.1` requires rendered contrast *on the actual material tier*. Here the
determinant is not the tier — it is user data. `§2`: *"Glass earns its blur by revealing live
content; otherwise it is a neutral well."* The live content this glass reveals is a **different
bounded entity** (pass 2's P2-8 measured 41.6 % of the neighbour occluded); P3-5 is the legibility
price of that same boundary violation. A menu belonging to entity A should not be tinted by
entity B.

---

### P3-6 · MAJOR · The canon 320 px arm — named four times in `VISUAL-CONSTITUTION.md`, measured by neither prior pass

`VISUAL-CONSTITUTION.md §3.2` and `§4` fix the observation arms as *"1440px, 390px, 320px, and
actual 400% browser-zoom"*. Pass 1 measured 1440/390/720×500; pass 2 measured 1440/390. At 320
(`probe-D10-pass3-results.json`):

| quantity | 320 px | 390 px |
|---|---|---|
| card metadata row | 250 px | 320 px |
| palette identity rendered | **0 px (0 %)** | **0 px (0 %)** |
| `Featured` badge | 148.4 px = **59.4 %** | 148.4 px = 46.4 % |
| **this menu's trigger** | 54 px = **21.6 %** | 54 px = 16.9 % |
| menu panel width | 192 px = **60.0 % of viewport** | 192 px = 49.2 % |
| **Export submenu width** | 301.4 px = **94.2 % of viewport**, at `x = 0` | 301.4 px = 77.3 % |
| **submenu covering its own parent** | **79.3 % of parent area** | 62.0 % |

`evidence/pass3-320-submenu.png` and `evidence/pass3-390-submenu.png` are the witnesses. At 320
the disclosure panel is a near-full-bleed slab that **erases the panel that opened it** — the
palette-name header, `Publish` and `Rename` are all gone; a sliver of `Delete` survives below it,
rendered on top of a third palette's card. The submenu's left edge is at `x = 0` while its parent
begins at `x = 81`: a child panel opening to the *left of and over* its own trigger.

Pass 1's D-15 gave this as *"59.9 px overlap"* at 390. The area measure at the canon arm is
**four-fifths of the parent**. A disclosure that hides its own context is not a tuned offset
problem; it is the wrong disclosure model for the width. `VISUAL-CONSTITUTION.md §3` law 6:
*"Mobile uses one document-scrolling stage→inspector→action sequence… Secondary controls may enter
a shallow disclosure region"* — a 94 %-of-viewport floating slab is not a shallow disclosure
region, it is an unnamed sheet.

The frames also corroborate D-11 visually: all five export labels render in **italic monospace**
while the parent panel is upright — legible in both captures.

---

### P3-7 · MAJOR · The visibility toggle's real accessible name is "Make private PUBLIC"

CDP AX tree, with the `remote && isOwned` rows injected byte-for-byte as `:48-60` writes them
(that arm needs a backend, so it cannot be reached on the dev route)
— `probe-D14-pass3-results.json`:

```json
{ "role": "menuitem", "name": "Publish PRIVATE",     "nameFrom": ["contents:"], "checked": null }
{ "role": "menuitem", "name": "Make private PUBLIC", "nameFrom": ["contents:"], "checked": null }
{ "role": "menuitem", "name": "Versions 4",          "nameFrom": ["contents:"], "checked": null }
```

**"Make private PUBLIC"** is the announcement. Two contradictory visibility words in one name,
nothing marking which is the verb and which is the state, `aria-checked: null`,
`aria-describedby: null`, `description: null` on every row measured
(`probe-D10-pass3-results.json` `rowNames`).

The component's own comment at `:42-47` says this is *"the VISIBILITY control as a designed
surface — one verb item naming the flip, with the CURRENT state annotated… (never a checkbox
bolt-on)."* The intent is sound and the visual register is defensible. The failure is that a
**toggle whose state is expressed only as adjacent text has no state at all** for anything that
does not read pixels — and the platform primitive for exactly this exists, is exported by the
barrel, and is used zero times:

```
$ cat demo/ui/dropdown-menu/index.ts
export { … DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuGroup, DropdownMenuShortcut … } from "@mkbabb/glass-ui";

$ grep -rn "DropdownMenuCheckboxItem" demo --include="*.vue"
(no matches)
```

The correct idiom is in the **same feature folder**, three directories away —
`demo/palettes/browser/search/UserSortMenu.vue:18-34` wraps its three options in
`DropdownMenuRadioGroup` + `DropdownMenuRadioItem`, so its selected state is real. One dropdown in
`demo/palettes/browser/` uses the producer's state primitives; the other hand-renders state as a
`<span>`. Owner edict 4 (*reuse existing component-type names*) names this precisely.

*(This compounds pass 2's P2-7, which found `DropdownMenuGroup` equally exported and equally
unused. Between them, three of the fourteen re-exported primitives — `Group`, `CheckboxItem`,
`Shortcut` — are the three this file hand-rolls or omits.)*

---

### P3-8 · MAJOR · `w-48` where the app minted `min-w-menu` for this exact purpose

`demo/styles/foundation.css:105-118`, in its own words:

```
/* ── Demo-local layout token bridges (D.W4 Lane A) ──
 * Surface the demo's :root layout tokens as Tailwind utility keys so
 * consumers write `min-w-menu` instead of `min-w-[var(--menu-min-w)]` etc. */
--min-width-menu:  var(--menu-min-w);
```
```
foundation.css:445:    --menu-min-w: 11rem;      /* = 176px */
```

The five `DropdownMenuContent` consumers in the app:

| consumer | class |
|---|---|
| `MobileMenuDropdown.vue:43` | `min-w-menu font-display` |
| `ProfileSection.vue:70` | `min-w-menu font-display` |
| `ProfileSection.vue:143` | `min-w-menu font-display` |
| `UserSortMenu.vue:16` | `w-48 font-display` |
| **`PaletteCardMenu.vue:7`** | **`w-48 text-small`** |

Three of five consume the token. This file is the only one of the five that declares neither the
token nor the app's menu type voice — and, decisively, it pins a **fixed `width`** on a panel whose
content is variable-length user data.

That single choice is the upstream cause of three findings already on the ledger:

- **D-10** — the header's content box is 178 px, so a 40-character palette name shows 56 %;
  `min-w-menu` would let the panel grow to its content.
- **P2-15** — parent panel 192 px vs submenu 242 px (desktop) / **301.4 px** (measured here at
  320/390): the child sizes to content because it was not given the fixed width, so the two panels
  of one menu can never agree.
- **P3-6** — the 94.2 %-of-viewport submenu against a 60 %-of-viewport parent.

Owner edict 5 (root-level styling, never per-instance overrides) and edict 3 (KISS — the token
already exists) both apply. `PROPORTION-AUDIT.md §5` law 8: the rendered relation, not the class name.

---

### P3-9 · MINOR · Three glyph spellings of "more" in one app; two of them co-render on this component's routes

```
$ grep -rn "MoreHorizontal|EllipsisVertical|MoreVertical" demo --include="*.vue"
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:103   MoreHorizontal   w-4 h-4   → this menu
demo/palettes/browser/slug/PaletteSlugBar.vue:85             MoreHorizontal   w-3.5 h-3.5
demo/palettes/browser/search/SearchFilterBar.vue:6           EllipsisVertical h-4 w-4   → a Filters *Popover*
demo/palettes/browser/search/UserSortMenu.vue:13             EllipsisVertical w-4 h-4   → a sort menu
demo/shell/dock/layers/ActionBarLayer.vue:49-50              EllipsisVertical
demo/shell/dock/menus/MobileMenuDropdown.vue:41              MoreVertical     w-6 h-6
```

Three lucide glyphs, two orientations, four sizes, for one affordance class. On `/#/browse` and
`/#/palettes` at least two render simultaneously: `SearchFilterBar`'s vertical ellipsis sits in the
search bar directly above the field of cards, each of which carries this component's horizontal
ellipsis. The vertical one in the search bar is visible in the mega-tranche capture
`shots/safari-mobile-dark/browse.png`, and it does not even open a menu — it opens a Filters
popover.

`PROPORTION-AUDIT.md` **PR-16** is the governing row: *"`…` keeps a named menu purpose plus
expanded state or is removed."* Two `…` marks on one screen meaning *filters* and *palette actions*
is the definition of an unnamed purpose.

---

### P3-10 · MINOR · Five `DropdownMenuLabel` recipes across four files; two of them are in this file

```
ProfileSection.vue:71      class="px-2 py-1.5"
MobileMenuDropdown.vue:46  class="px-2 py-1.5"
MobileMenuDropdown.vue:66  class="px-2 py-1.5"
UserSortMenu.vue:17        class="text-micro"
PaletteCardMenu.vue:9      class="font-display font-bold truncate max-w-[180px]"
PaletteCardMenu.vue:155    class="text-mono-caption uppercase tracking-wider text-muted-foreground"
```

One producer primitive, five consumer recipes, no two alike; this file supplies the two most
elaborate and the two that disagree with each other most (a Fraunces bold identity and a mono
uppercase caption, in the same panel, both `DropdownMenuLabel`). Two labels in one menu that share
a role and share nothing else is a register break the reader sees before they read a word. Edict 5.

---

### P3-11 · MINOR · Menu-row glyph scale disagrees with the sibling menu in the same folder

`PaletteCardMenu.vue` sets every row glyph `class="h-4 w-4"` (16 px, eleven sites).
`UserSortMenu.vue:23,27,31` sets every row glyph `class="w-3.5 h-3.5"` (14 px). Same primitive,
same feature area, same panel width, two icon rungs. `PROPORTION-AUDIT.md §5` law 2 requires one
anatomy per repeated species.

---

### P3-12 · MINOR · Two irreversible actions with the same first letter, the same glyph and the same measured ink

In the `remote && isOwned && isAdmin` arm the menu renders `Delete` (`:133-140`) and
`Delete (admin)` (`:163-169`). Both carry `<Trash2 class="h-4 w-4" />`; both carry
`text-destructive focus:text-destructive`, which is inert (D-2, re-corroborated at ΔRGB 0–1 in
every arm above); they are separated by one `DropdownMenuLabel` that has no programmatic scope
(P2-7). The two actions differ in authority and in blast radius and agree in every rendered channel
except a parenthetical.

**Labelled hypothesis (not reproduced):** reka's menu typeahead matches on `textValue`/text
content, so a `d` keystroke in this arm resolves ambiguously between them. I did not execute this
arm — it requires a signed-in admin against a live backend. The label/glyph/ink collision above is
measured; the typeahead consequence is inference.

---

### P3-13 · INFO · Pass 2's dark-arm pixel measurement is instrument-invalid; corrected, D-2 is worse in dark than reported

`probe-D8-pass2.mjs:96-104` hard-codes light-mode polarity — *"darkest pixel inside a box = the
ink"*. In dark mode the ink is the **light** pixel. Its dark arm therefore reported the surface as
ink:

| | pass 2 (`probe-D8-pass2-results.json` `.dark`) | pass 3 corrected (`probe-D11-pass3-results.json` `.dark`) |
|---|---|---|
| surface | `rgb(195,185,172)` | `rgb(81,69,61)` |
| `Rename` ink / contrast | `rgb(74,63,55)` / 5.28 | `rgb(233,230,226)` / **7.44** |
| `Delete` ink / contrast | `rgb(81,69,61)` / 4.79 | `rgb(233,230,226)` / **7.44** |
| Δ(Delete, Rename) | **11** | **0** |
| annotation contrast | 5.19 | **1.94** |

Pass 1 measured `Delete color = rgb(233,230,226)` in dark by computed style — which matches pass 3
and not pass 2. **The corrected dark delta between the irreversible action and the reversible one
is 0, not 11**, and the dark annotation is 2.7× worse than pass 2 recorded. Pass 2's dark
conclusions understated both defects; its light arm stands.

This is an evidence-law note about the audit, not the component. It is recorded because it changed
a prior verdict.

---

## Corroboration of prior load-bearing claims, with a different instrument

- **P2-1 (identity at 0 px, 390)** — CONFIRMED independently, different seed, different probe:
  `probe-D10-pass3-results.json` `vp390.row.name` = `{ w: 0, scrollW: 102 }`, trigger 54 px.
  And **extended**: the same holds at 320 px, where the trigger's share rises to 21.6 %.
- **D-2 (destructive ink inert)** — CONFIRMED at the pixel level in **five** arms: ΔRGB 1 / 0 / 1 /
  1 / 0 (light / dark / contrast-more / reduced-transparency / **forced colours**). In forced
  colours both rows are exactly `rgb(0,0,0)` at 21 : 1 — the mode that exists to restore
  distinguishability makes them provably identical.
- **D-11 (submenu italic)** — CONFIRMED visually in two fresh captures at 320 and 390.
- **D-15 / P2-8 (occlusion)** — CONFIRMED and sharpened: 79.3 % of the parent panel at 320.
- **D-24 / P2-16 (zero matrix coverage)** — CONFIRMED with my own eyes:
  `shots/safari-desktop-light/palettes.png` reads *"No saved palettes yet"*;
  `shots/safari-mobile-dark/browse.png` reads *"The commons is unreachable."* Neither route
  photographed a single palette card in any of the 60 captures.

---

## What is sound — the negative proof, third pass

Checked, and found to have no defect:

1. **No page reflow on open.** `body { padding-right }` stays `0px` and every card's `x` stays
   `754` across the open transition (`probe-D10-pass3-results.json`). The shell scrolls an inner
   container rather than the document, so reka's scroll lock costs no scrollbar-gutter shift. The
   freeze is real (P3-3); the shift is not.
2. **No horizontal overflow at any measured width.** With the menu *and* submenu open at 320 and
   390: `document.scrollWidth === innerWidth` (320/320, 390/390), `horizontalOverflow: false`,
   `overflowsRight: −47`, `overflowsBottom: −51.7`. The submenu is clamped inside the viewport; it
   simply lands on its own parent.
3. **The saved arm does not scroll internally** at 320/390: `scrollHeight 243 === clientHeight 243`,
   `max-height: 506.4px`. D-25's scrolling case is the 10-row arm only.
4. **The tap target holds at 320.** 54 × 54 (`probe-D10`), above the 44 px floor, at the narrowest
   canon width.
5. **glass-ui is not at fault for P3-4.** The producer honours `prefers-contrast: more`
   (blur 11px → 1.1px), `prefers-reduced-transparency: reduce` (backdrop-filter → `none`, surface →
   opaque `rgb(253,245,236)`) and `forced-colors` (surface → `Canvas`, border → `CanvasText`) —
   all measured. Every accessibility failure in this report is consumer-side.
6. **Menu/menuitem semantics are producer-correct**, and the AX tree confirms it: one `role="menu"`,
   seven `role="menuitem"`, names computed `from contents`, `aria-labelledby` wired to the trigger.
   The component adds no ARIA and breaks none — it simply supplies nothing worth announcing (P3-1).
7. **Motion, `verbatimModuleSyntax`, the DI seam, and non-god-module status** — re-checked against
   pass 1's measurements; nothing in this pass contradicts them. Motion remains the one axis with
   no defect across all three passes.

---

## State coverage — the states pass 1's table did not have a row for

| state | handled? | evidence |
|---|---|---|
| `prefers-reduced-transparency: reduce` | **degraded** — producer correct, annotation still 1.82 : 1 | P3-4 |
| `prefers-contrast: more` | **degraded** — annotation still 1.81 : 1 | P3-4 |
| `forced-colors: active` | **degraded** — annotation 1.96 : 1 while its neighbours reach 21 : 1; destructive Δ = 0 | P3-4, D-2 |
| dark (correctly measured) | **degraded** — destructive Δ = 0, annotation 1.94 : 1 | P3-13 |
| open-modal barrier (page frozen) | **undesigned** — never mentioned in the SFC | P3-3 |
| "which palette is this?" under AT | **broken** — no obtainable identity | P3-1 |
| 320 px viewport | **broken** — badge over trigger; submenu erases parent | P3-2, P3-6 |
| adjacent-entity-dependent surface | **undesigned** — contrast is a function of user data | P3-5 |

Added to pass 1's nineteen rows, **fourteen of twenty-seven enumerated states are unhandled,
broken or degraded.**

---

## Proportion and seat law — pass-3 judgment

| canon row | verdict |
|---|---|
| `VISUAL-CONSTITUTION.md:102` — the card body owns no action menu | **VIOLATED in whole** (D-1) |
| `VISUAL-CONSTITUTION.md §2` — one surface, one tier; glass reveals *its own* live content | VIOLATED — the panel is tinted by the neighbouring entity, 1.56× contrast swing (P3-5) |
| `VISUAL-CONSTITUTION.md §3` law 6 — mobile secondary controls use a *shallow* disclosure | VIOLATED — 94.2 %-of-viewport slab that erases its parent (P3-6) |
| `VISUAL-CONSTITUTION.md §4.1` — rendered contrast on the actual material tier | VIOLATED — 3.59 : 1 header, 1.81–1.96 : 1 reason (P3-4, P3-5) |
| `VISUAL-CONSTITUTION.md §4.1` — role, **accessible name**, state/value explicit | **VIOLATED categorically** — no identity, no `aria-checked` (P3-1, P3-7) |
| `VISUAL-CONSTITUTION.md §5.1` — overlays preserve underlying scroll; announce title/state | VIOLATED (P3-3, P3-1) |
| `PROPORTION-AUDIT.md §5` law 2 — one protagonist, one identity line; one anatomy per species | VIOLATED (P3-2, P3-10, P3-11) |
| `PROPORTION-AUDIT.md §5` law 7 — glyph size, target size and reservation are separate quantities | VIOLATED — 54 px target, 0 px reservation, badges overwriting it (P3-2) |
| `PROPORTION-AUDIT.md §5` law 8 — rendered relation beats token intent | VIOLATED (P3-2, P3-4, P3-5, P3-6, P3-8) |
| `PROPORTION-AUDIT.md` **PR-16** — `…` keeps a named purpose or is removed | VIOLATED — three glyphs, two co-rendering, one of them a Filters popover (P3-9) |
| owner edict 4 — reuse the producer's component-type names | VIOLATED — `CheckboxItem`/`Group`/`Shortcut` exported, used zero times (P3-7) |
| owner edict 5 — root-level styling, never per-instance | VIOLATED — `w-48` over `min-w-menu`; five label recipes (P3-8, P3-10) |

---

## The cure, unchanged in direction and strengthened again

> *"Full detail, rename/lifecycle/export actions and durable operation state live in the selected
> inspector."* — `VISUAL-CONSTITUTION.md:102`

**Delete `PaletteCardMenu.vue`. Move its seventeen actions into the selected inspector. Reduce the
card to the single named `<button type="button" aria-pressed>` seat of `PROPORTION-AUDIT.md §5`
law 12.**

Pass 1 showed a transient overlay cannot hold durable state. Pass 2 showed the row cannot afford
the trigger's 54 px. Pass 3 shows the three things that make the move non-negotiable rather than
preferable:

- **It cannot be named.** An inspector is a region of the page with the palette's identity as its
  heading. An anonymous overlay hanging off a card can only be given identity by duplicating the
  name a third time — and it must hide the field to exist at all (P3-1).
- **It cannot be afforded.** At the narrowest canon width the trigger is not merely competing with
  the identity, it is being drawn over by the metadata (P3-2). No flex tuning fixes a row that is
  86 px short.
- **It cannot be lit.** A translucent panel that composites over the *next* entity has no contrast
  of its own to guarantee (P3-5), and a degraded-state register inside a `[data-disabled]` row is
  unreachable by every accessibility mode a user can turn on (P3-4).

Three items should not wait for the transposition, in addition to pass 1's D-2/D-3 and pass 2's
P2-2/P2-3:

- **P3-2** — the card row's `shrink-0` metadata overruns the trigger by 86 px at 320. Visible
  breakage on the narrowest supported width, today.
- **P3-4** — one `opacity-55` inside a `--opacity-disabled: 0.5` row, unreadable in five arms
  including forced colours. One class deleted; the reason moves outside the dimmed element.
- **P3-8** — `w-48` → `min-w-menu`. One token substitution that dissolves D-10's 56 % clip and
  P2-15's panel disagreement at the same time.

---

*No source files were edited by this seat. Every artefact written lives under*
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/`. *Pass 1 and pass 2 are preserved
verbatim at* `challenge-D-design.pass-1-2026-07-28.md` *and*
`challenge-D-design.pass-2-2026-07-28.md`.

# CHALLENGE-D — PaletteCardMenu: the design is flawed (PASS 2)

Seat: CHALLENGE-D (design axis) · pass 2 · 2026-07-28
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`).

The pass-1 report is preserved VERBATIM at `challenge-D-design.pass-1-2026-07-28.md`
(25 findings, D-1…D-25). This pass **independently re-measured its two load-bearing claims**
and then went after what it did not look at. Sixteen new defects, three of them at the top of
the ladder. Pass-1's D-1…D-25 stand; they are not restated here except where this pass either
corroborated them with a different instrument or sharpened them.

---

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm, the
tier explicitly declared at spawn. The seat is declared, not inherited. **No defect on this axis.**

---

## Verdict

**DEFECTIVE — pass 2 adds 3 BLOCKER, 6 MAJOR, 7 MINOR/INFO on top of pass 1's 25.**

The premise holds harder than pass 1 stated it. Pass 1 argued the component *should not exist*
(`VISUAL-CONSTITUTION.md:102` deletes the card action menu outright) and that two of its features
do not work. Pass 2 found the thing that makes that argument physical:

> **On a 390 px viewport the palette card renders its identity at exactly 0 px wide while this
> component's trigger holds a fixed 54 px — 16.9 % of the row.** The card has no name on mobile.
> The only surviving spelling of the palette's identity is this menu's own header, which clips it
> to 56 % and offers no `title` to recover it.

That is the whole indictment in one measurement: **a secondary action affordance was given
immovable space inside the identity line, and the protagonist was the thing that yielded.**

The strongest single new defect is **P2-1**. The second (**P2-2**) is a hard HTML content-model
violation this component participates in at a call site nobody audited: on `/#/mix` the entire
`PaletteCard` — menu trigger included — is nested inside a `<button aria-pressed>`.

---

## Method and probe log

**Static.** Full re-read of the SFC, `PaletteCard.vue`, `PaletteCardMeta.vue`,
`demo/palettes/utils.ts`, `demo/palettes/usePaletteStore.ts`,
`demo/platform/transport/availability.ts`, `demo/ui/dropdown-menu/index.ts`, the compiled
glass-ui 7.0.0 CSS (`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`), **all four `PaletteCard`
call sites** (`PalettesPane.vue`, `BrowsePane.vue`, `ExtractWorkbench.vue`,
`MixSourceSelector.vue`), and the three canon documents.

**Visual.** Read the mega-tranche Safari matrix shots for both routes this component lives on
(`shots/safari-{desktop,mobile}-{light,dark}/{palettes,browse}.png`) and every pass-1 evidence
capture.

**Live.** Chromium/Playwright against the running dev server `http://localhost:9000`, route
`/#/palettes` with `localStorage["color-palettes"]` seeded as
`{version:1,palettes:[…]}` (pass 1's probes used a bare array; the store's serializer at
`usePaletteStore.ts:24-27` rejects anything without a numeric `version`, so this pass's seed is
the one the app actually accepts). Matrices: 1440×1000 light, 1440×1000 dark (via the `dark`
class, the same mechanism `visual/capture.mjs:67-74` uses), 390×844 touch, `/#/mix`, `/#/extract`.

**Rendered-pixel contrast.** This pass did not compute contrast from tokens. It screenshots the
live menu, decodes the PNG into a canvas in a second page, and samples real pixels
(`probe-D8-pass2.mjs`).

| artefact | contents |
|---|---|
| `probe-D6-pass2.mjs` / `-results.json` | icon gutter, group structure, typeahead, icon ARIA, header recovery, occlusion geometry, `/#/mix` nesting, `/#/extract` surface |
| `probe-D7-pass2.mjs` / `-results.json` | tokens, submenu panel geometry, disabled-opacity compounding, mobile trigger |
| `probe-D8-pass2.mjs` / `-results.json` | **rendered-pixel** contrast, light + dark |
| `probe-D9-pass2.mjs` / `-results.json` | **the 390 px metadata-row allocation** |
| `evidence/pass2-mobile-390-row.png` | **the card with no name** |
| `evidence/pass2-light-degraded.png` | the degraded arm rendered, light |
| `evidence/pass2-dark-degraded.png` | the degraded arm rendered, dark |
| `evidence/pass2-desktop-submenu.png` | both panels open, desktop |
| `evidence/pass2-mix-source.png` | `/#/mix` — the card inside a button |

---

## The evidence gap, restated more sharply than pass 1 could

Pass 1 recorded that the mega-tranche matrix never *opened* this menu. It is worse than that.
Both routes the component lives on rendered **empty** in every one of the 60 captures:

```
$ python3 - <<'PY'   # REPORT.json, /#/palettes and /#/browse, all four matrices
safari-desktop-light /#/palettes  overflowX=0  buttons=25  nameless=1
safari-mobile-light  /#/palettes  overflowX=0  buttons=12  nameless=0
…
PY
```

and `shots/safari-mobile-light/palettes.png` reads **“No saved palettes yet.”** across the whole
stage. So the matrix photographed **zero palette cards**, at any viewport, in any scheme. Every
`smallTapTargets` / `horizontalOverflow` / `namelessButtons` column for these routes describes a
page with no instance of this component on it. **Every finding in both passes is
first-observation.** (INFO · P2-16.)

---

## The new findings

### P2-1 · BLOCKER · At 390 px the palette identity renders at 0 px while this menu's trigger holds a fixed 54 px

Measured on the live route, one seeded palette, `probe-D9-pass2-results.json`:

```json
"mobile-390": {
  "rowWidth": 320,
  "triggerWidth": 54,  "triggerHeight": 54,  "triggerShareOfRow": 16.9,
  "nameRenderedWidth": 0,
  "nameScrollWidth": 102,
  "nameVisibleFraction": 0,
  "rowChildren": [
    { "tag": "svg",    "w": 16   },                        // drag handle
    { "tag": "SPAN",   "w": 0,     "text": "Muted Terracotta a" },   // <-- the identity
    { "tag": "DIV",    "w": 148.4, "text": "Featured" },
    { "tag": "DIV",    "w": 32.9,  "text": "5" },
    { "tag": "SPAN",   "w": 20.8,  "text": "4" },
    { "tag": "BUTTON", "w": 54,    "text": "" }            // <-- this component's trigger
  ]
}
```

`evidence/pass2-mobile-390-row.png` is the witness. The card row reads, in full:

```
⣿   🏅 Featured   5   ⏱4   ⋯
```

There is no name. The user cannot tell which palette the card is.

**The allocation.** Of 320 px: ornamental status badge **148.4 px (46.4 %)**, colour count 32.9 px,
version chip 20.8 px, drag handle 16 px, **this menu's trigger 54 px (16.9 %)**, palette identity
**0 px (0 %)**. Every one of those five is `shrink-0` (`PaletteCard.vue:49, 64, 72, 101` and the
`shrink-0` wrapper at `:82`); the name alone sits in the `min-w-0` flex arm at `:44`, so it is the
sole element that absorbs compression — all of it.

**Canon.** `VISUAL-CONSTITUTION.md §4` fixes palette identity at `--type-subheading`, Fraunces.
`PROPORTION-AUDIT.md §5` law 2: *“A card has one protagonist, one identity line.”* Law 8: *“Real
rendered relation wins over token intent.”* The rendered relation is 0 px.

**Compounding.** The only surviving spelling of the identity at 390 px is this component's own
header — measured `scrollW 319 / clientW 178` = **56 % shown**, with `title: null` (P2-10). So the
name is destroyed in the row, truncated in the menu, and recoverable nowhere.

**Reproduction.** `node docs/.../PaletteCardMenu/probe-D9-pass2.mjs` with the dev server up.

**Cure (gestalt).** This is D-1's cure made concrete rather than a flex tweak. A card whose
identity line must also host a 54 px action menu, a status badge and three chips has been asked to
be an omnibus, which `VISUAL-CONSTITUTION.md:102` forbids in the same sentence that deletes this
component. Move the actions to the selected inspector; the row then carries identity plus the
`aria-pressed` seat and nothing competes with it.

---

### P2-2 · BLOCKER · On `/#/mix` the whole card — this menu's trigger included — is nested inside a `<button>`

`demo/workbenches/mix/MixSourceSelector.vue:238-268`:

```html
<button
    :aria-pressed="isPaletteSelected(palette.slug)"
    :aria-label="`${…} palette ${palette.name}`"
    @click="togglePalette(palette)"
>
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

`PaletteCard` renders `PaletteCardMenu`, whose trigger is
`<Button icon-only aria-label="Palette menu">` (`PaletteCard.vue:96-104`). Measured live on
`/#/mix` (`probe-D6-pass2-results.json`):

```json
"mix": {
  "nestedInteractiveInButton": 2,
  "nestedSample": [
    { "tag": "BUTTON", "label": "Palette menu",
      "outerLabel": "Select palette Muted Terracotta and Deep Sea Foam Study" },
    { "tag": "BUTTON", "label": "Palette menu", "outerLabel": "Select palette Temp" }
  ],
  "paletteCardsInsideButton": 2
}
```

Two independent violations:

1. **HTML content model.** `button`'s content model is phrasing content *with no interactive
   content descendant*. A `button` inside a `button` is invalid; activation behaviour, focus order
   and event targeting are all unspecified territory.
2. **ARIA presentational children.** `role="button"` is a role whose descendants are presentational
   — a user agent is permitted to prune the entire subtree from the accessibility tree. The
   “Palette menu” trigger is therefore *permitted to not exist* for assistive technology at this
   call site, while remaining a visible 36–54 px affordance.

And the menu is inert there regardless: `MixSourceSelector.vue:264-267` passes **no listeners at
all**, so all seventeen of the menu's emitted actions terminate in nothing (P2-4).

**Cure.** The canon already wrote it: `PROPORTION-AUDIT.md §5` law 12 — the card root is a
noninteractive container whose *one* native named `<button aria-pressed>` child spans the
specimen/identity region. Mix wrapped the card in the button instead of putting the button inside
it, and the menu is the interactive content that makes the mistake illegal rather than merely
untidy.

---

### P2-3 · MAJOR · The degraded-state annotation renders at 1.75 : 1 — the reason an action is unavailable is the least legible text on screen

The K-INV5 register (the component's own comment at `:24-26`) exists to **name** the degraded
state in-register rather than in a toast. Measured on the live menu with the disabled arm forced
onto the real `Publish` row exactly as the SFC writes it, then sampled from **rendered pixels**
(`probe-D8-pass2-results.json`, light):

| element | sampled ink | contrast vs the composited menu surface `rgb(235,224,217)` |
|---|---|---|
| `Rename` (ordinary row) | `rgb(28,25,23)` | **13.49 : 1** |
| `Delete` (destructive row) | `rgb(28,24,22)` | **13.59 : 1** |
| menu header (the palette name) | `rgb(112,89,66)` | **5.07 : 1** |
| **the `offline` annotation** | `rgb(176,171,168)` | **1.75 : 1** |

Mechanism (`probe-D7-pass2-results.json`):

```json
"tokens":     { "--opacity-disabled": "0.5" },
"compounded": { "itemOpacityDisabled": "0.5", "annotationOpacity": "0.55",
                "effectiveAlpha": 0.275, "annotationColor": "rgb(28, 25, 23)" }
```

glass-ui dims the whole disabled row — `.dropdown-menu__item[data-disabled]{opacity:var(--opacity-disabled)}`
— and the consumer's `opacity-55` (`:37`, `:57`) then multiplies **inside** it. 0.5 × 0.55 =
**0.275**. `evidence/pass2-light-degraded.png` is the witness: `⊘ Publish OFFLINE`, with the
explanation visibly fainter than the disabled label it explains.

**This inverts the register's purpose.** The disabled verb is at 0.5; the reason is at 0.275 —
the reason is **45 % dimmer than the thing it is explaining**, and at 1.75 : 1 it is below the
3 : 1 large-text floor, let alone AA's 4.5 : 1. `VISUAL-CONSTITUTION.md §4.1`: *“Selected, failed,
pending, withdrawn and disabled states are never color-only… state/value and associated
error/status are explicit.”* An explicit status you cannot read is not explicit.

**Cure.** An availability reason is not a shortcut annotation. It belongs outside the dimmed row —
or, per D-1, in the inspector where a durable operation state can carry it at full ink.

---

### P2-4 · MAJOR · At two of the four call sites the menu's emits reach no listener; Export is dead on `/#/extract` and every row is dead on `/#/mix`

The `Export` submenu has **no `v-if`** (`:107-130`): it renders for every `paletteKind`, at every
call site. The four call sites:

| call site | listeners wired | Export wired? |
|---|---|---|
| `demo/palettes/PalettesPane.vue:82-97` | `click delete publish rename edit-color export` | yes |
| `demo/palettes/BrowsePane.vue:92-119` | all 16 | yes |
| `demo/workbenches/extract/ExtractWorkbench.vue:145-156` | `click save rename add-color` | **no** |
| `demo/workbenches/mix/MixSourceSelector.vue:264-267` | **none** | **no** |

Extract's palette is `id: "__extracted__…"` → `getPaletteKind` returns `temporary`
(`demo/palettes/utils.ts:20-30`), so its menu renders **Save · Rename · Export ▸ (5 rows)**.
Five of its eight rows do nothing. Measured on the live route
(`probe-D6-pass2-results.json` `extract.paletteMenus: 2`; `downloads: []`).

`PROPORTION-AUDIT.md §5` law 5: *“A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed.”* A labelled action that emits into the void is
none of those. Pass 1's D-19 saw the *stringly-typed bus* as a typo hazard; the shipped
consequence is larger — the bus is why a whole submenu can be rendered at a site that never
subscribed to it, with no type error and no runtime signal.

---

### P2-5 · MAJOR · The icon gutter established in the parent panel is abandoned in the child — a 24 px rhythm break inside one menu

Measured with both panels open, desktop 1440 (`probe-D7-pass2-results.json` `submenu.items`):

| panel | item | icon? | item left | text left | **text inset** | font-style |
|---|---|---|---|---|---|---|
| parent | Publish / Rename / Export / Delete | yes | 1017 | 1049 | **32 px** | normal |
| sub | JSON / CSS Custom Properties / Tailwind Config / SVG Swatch / PNG Swatch | **no** | 1202 | 1210 | **8 px** | **italic** |

The parent establishes a 32 px icon gutter (8 px padding + 16 px glyph + 8 px gap). The child
drops it entirely and starts text at the bare 8 px padding. Two panels of one menu tree,
disagreeing about where a line of text begins by **24 px**, while also disagreeing about
font-style (P2-15). `evidence/pass2-desktop-submenu.png` and pass 1's
`evidence/mobile-light-submenu-open.png` both show it.

`PROPORTION-AUDIT.md §5` law 8 — real rendered relation, not token intent — and law 2 (one
anatomy per repeated species) are the governing rows. The five export rows are the *same species*
as the eleven parent rows; nothing about them earns a different left edge.

---

### P2-6 · MAJOR · The divider budget is inverted: three separators spent, none before the irreversible action

Measured group order, parent panel (`probe-D6-pass2-results.json` `parentOrder`) and both panels
(`probe-D7-pass2-results.json` `submenu.separators`):

```
parent   label   "Muted Terracotta and Deep Se…"    y 618
parent   ── separator ──                            y 654.1
parent   menuitem Publish                           y 659.1
parent   menuitem Rename                            y 703.1
parent   ── separator ──                            y 751.1
parent   sub-trigger Export ▸                       y 756.1
parent   menuitem Delete                            y 800.1   <-- same group as Export
sub      ── separator ──                            y 898     <-- text formats | image formats
```

Three separators are spent in this tree. Two divide the parent; **one is spent inside the submenu
to separate `Tailwind Config` from `SVG Swatch`** — i.e. on a taxonomy (text formats vs image
formats) with no consequence whatever. **Zero** separate `Delete` from the disclosure sub-trigger
44 px above it.

`PROPORTION-AUDIT.md §5` law 4: *“A divider is retained only when grouping would be ambiguous
without it.”* The one place in this component where grouping is genuinely ambiguous — an
irreversible destructive action abutting a harmless disclosure, in identical ink (pass 1's D-2,
corroborated below at ΔRGB = 1) — is the one place the design declined to spend a line. Pass 1's
D-14 saw the missing divider; it did not see that the same tree spent one on export file types.

---

### P2-7 · MAJOR · No `DropdownMenuGroup` anywhere; the `Admin` label is an orphan text node with no programmatic scope

The producer exports it and the barrel re-exports it:

```
$ cat demo/ui/dropdown-menu/index.ts
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, … } from "@mkbabb/glass-ui";

$ grep -rn "DropdownMenuGroup" demo --include="*.vue"
(no matches)
```

Measured DOM of the open menu (`probe-D6-pass2-results.json` `parentOrder`): the content's
children are **flat** — `div.dropdown-menu__label`, `div[role=separator]`, `div[role=menuitem]` ×n.
There is no `role="group"` and no `aria-labelledby` anywhere in the tree.

The component declares three semantic groups by comment and by separator — lifecycle
(`:15-102`), disclosure + destruction (`:107-150`), and **Admin** (`:153-170`) — and expresses none
of them structurally. The `Admin` `DropdownMenuLabel` at `:155` therefore has no association with
the two elevated-authority items beneath it: an AT walk announces a bare string, then two
menuitems that claim no scope. `Delete (admin)` and the owner's own `Delete` are announced
identically apart from a parenthetical.

`VISUAL-CONSTITUTION.md §7` (About and Admin): *“Elevated authority is communicated by labeling and
scope, not by a fourth visual system.”* Here the labeling exists and the **scope does not**.

**Cure.** `<DropdownMenuGroup aria-labelledby>` around the admin arm — a primitive already
exported, already re-exported, used zero times, and exactly the component-type name edict 4 asks
consumers to reuse.

---

### P2-8 · MAJOR · The menu covers 41.6 % of the adjacent palette card

Measured, desktop 1440, two-palette list (`probe-D6-pass2-results.json` `occlusion`):

```json
"menu":  { "x": 1010, "y": 611,   "w": 192, "h": 240.1 },
"cards": [ { "label": "Palette: Muted Terracotta…", "x": 754, "y": 518.6, "w": 462, "h": 100 },
           { "label": "Palette: Temp",              "x": 754, "y": 630.6, "w": 462, "h": 100 } ],
"overlapPx": [ { "label": "…Terracotta…", "area": 1459,  "cardArea": 46200 },
               { "label": "Palette: Temp", "area": 19200, "cardArea": 46200 } ]
```

19,200 / 46,200 = **41.6 %** of the *next* palette entity is occluded — a different bounded object
than the one the menu belongs to. `align="end"` (`:7`) with the producer's default side/offset
drops the panel straight down the list. On a two-item list that is the entire remainder; pass 1's
mobile capture shows the same mechanism producing legible double text at 390 px (D-15).

`VISUAL-CONSTITUTION.md §2`: *“One surface has one tier.”* A transient overlay belonging to entity
A, rendered on top of 41.6 % of entity B, at a translucency that lets B's ink read through, breaks
the entity boundary the Card tuple exists to draw. `PROPORTION-AUDIT.md §5` law 1 — a Card houses
**one** bounded object — is the same ruling from the other side.

---

### P2-9 · MINOR · The five leading glyphs are not hidden from assistive technology — while the producer's own chevron is, and the sibling file gets it right

Measured (`probe-D6-pass2-results.json` `iconsAria`):

```json
[ { "parentText": "Publish", "ariaHidden": null },
  { "parentText": "Rename",  "ariaHidden": null },
  { "parentText": "Export",  "ariaHidden": null },
  { "parentText": "Export",  "ariaHidden": "true" },   <-- the producer's ChevronRight
  { "parentText": "Delete",  "ariaHidden": null } ]
```

Every glyph the SFC writes (`:20, :28→Globe, :54, :68, :78, :88, :98, :109, :138, :159/:160, :167`)
is a bare `<svg>` with no `aria-hidden`, no `role`, no title — decorative marks duplicating the
adjacent label, left in the accessibility tree. The one glyph that *is* hidden is the sub-trigger
chevron glass-ui emits.

The correct idiom is fifteen lines away in the same folder:

```html
<!-- PaletteCard.vue:103 -->
<MoreHorizontal class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
```

`PROPORTION-AUDIT.md §5` law 5 requires every small mark to be data, status, a labelled action, a
drag affordance, a focus register — or removed. A decorative duplicate that is none of those and
is also not hidden is the one disposition the law does not offer.

---

### P2-10 · MINOR · The truncated menu header has no recovery path — while the card's own name span has one

Measured (`probe-D6-pass2-results.json` `header`):

```json
{ "text": "Muted Terracotta and Deep Sea Foam Study",
  "title": null, "ariaLabel": null,
  "scrollW": 319, "clientW": 178,
  "color": "rgb(112, 89, 66)", "fontSize": "14.384px" }
```

56 % shown, `title: null`, `aria-label: null`. There is no hover, no tooltip, no expansion — the
remaining 44 % of the name is unreachable from this panel. One file over, the card solves exactly
this:

```html
<!-- PaletteCard.vue:57 -->
:title="palette.name"
```

Combined with P2-1 (the card's name is 0 px at mobile), the consequence is that on a phone the
palette's full name is **not obtainable anywhere in the card's UI**.

Sharpening pass 1's D-10 with a second axis: the header's rendered contrast is **5.07 : 1**
(P2-3's table) against **13.49 : 1** for the ordinary action rows. The identity is not merely
smaller than the actions beneath it — it is **2.66× less contrasty** than they are. It passes AA;
it loses the hierarchy anyway.

---

### P2-11 · MINOR · The open-state API is deliberately un-`v-model`-able

```ts
// PaletteCardMenu.vue:206-227
const { palette } = defineProps<{ …; menuOpen: boolean; … }>();
defineEmits<{ action: [action: string]; updateOpen: [value: boolean] }>();
```

```html
<!-- PaletteCard.vue:83-90 -->
:menu-open="menuOpen" @update-open="menuOpen = $event"
```

The event is `updateOpen`, not `update:open`, so `v-model:open` is structurally impossible on this
component — the one thing Vue's own two-way binding exists for, spelled just far enough off the
convention to disable it. The idiomatic Vue 3.5 form is one line, `defineModel<boolean>("open")`,
and it is what glass-ui's own `<Dialog v-model:open>` uses fifty lines away in
`PalettesPane.vue:101`. Edict 7.

---

### P2-12 · MINOR · `copyAll` is a missing affordance, not merely dead code

```
$ grep -rn "copyAll" demo
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294:  copyAll: () => void writeClipboard(props.palette.colors.map((c) => c.css).join(", ")),
```

The parent **implements** copy-all-colours and the menu never gives it a row. Pass 1 (D-19) read
this as dead code inside a typo-swallowing lookup, which it also is. The design reading is worse:
copying a palette's colours is the single most ordinary thing a person does with a palette in a
colour tool, the handler is written and working, and the only path to it on a card is the
hover-only swatch popover (`PaletteCard.vue:139-157`) that `VISUAL-CONSTITUTION.md:102` explicitly
abrogates — *“no … hover-only swatch-action path.”*

`PROPORTION-AUDIT.md` **PR-07** (*“Hover-only/unlabeled controls … ADD-AFFORDANCE / REMOVE”*) is
the governing row: the hover path retires and the surviving action needs a named seat. Half of
that has been built and never connected.

---

### P2-13 · MINOR · The version count is rendered twice, ~40 px apart, in two different registers

`PaletteCardMeta.vue:26-33` renders `⏱ 4` in the card row (`text-micro`, `text-muted-foreground`,
`title="4 versions"`). `PaletteCardMenu.vue:93-102` renders `Versions   4` in the menu
(`text-caption text-muted-foreground`). Both are visible simultaneously in
`evidence/desktop-light-menu-open.png` — the chip at the card row, the row in the panel below it.
One datum, two renderings, two type registers, one of them a bare glyph with no name and one of
them a labelled row.

`PROPORTION-AUDIT.md §5` law 6: *“Subtraction precedes explanation.”*

---

### P2-14 · MINOR · The five export labels use three naming conventions and none of them names what you get

| row | label | what `PALETTE-CONTRACT.md:213-229` says you receive |
|---|---|---|
| `:113` | `JSON` | `<slug>--r<n>.json` |
| `:116` | `CSS Custom Properties` | `<slug>--r<n>.css` |
| `:119` | `Tailwind Config` | `<slug>--r<n>.tailwind.json` — **data, explicitly not a config file** |
| `:123` | `SVG Swatch` | `<slug>--r<n>.svg` |
| `:126` | `PNG Swatch` | `<slug>--r<n>.png` |

Three conventions in five adjacent rows: bare format (`JSON`), format + medium
(`CSS Custom Properties`), format + artifact (`Tailwind Config`, `SVG Swatch`). And
`Tailwind Config` actively misdescribes its output — the contract at `:266` is emphatic:
*“Tailwind export is data, not executable JavaScript… V emits no CommonJS/ESM function, comment,
plugin, `require`, `eval` or configuration side effect.”* The row promises a config; the byte
contract forbids one.

The contract also fixes the filename exactly, and `:325` requires the seat to expose
**`Download FILENAME`**. Five rows that name neither the extension nor the file are the opposite
of that seat (pass 1's D-5).

---

### P2-15 · INFO · The two panels of one menu disagree on four registers at once

Measured (`probe-D7-pass2-results.json` `submenu.panels` and `.items`):

| register | parent panel | sub panel |
|---|---|---|
| width | **192 px** (`w-48`, `:7`) | **242 px** (content-sized) |
| font-size | **16.4 px** | **14.384 px** |
| font-style | normal | **italic** |
| icon gutter (text inset) | **32 px** | **8 px** |
| border-radius | 12 px | 12 px (the one agreement) |

Two of these are consequences of a single class chosen for a size it does not deliver —
`class="text-caption"` on `DropdownMenuSubContent` (`:112`), whose `font-size` is overridden by
`.dropdown-menu__item{font-size:var(--dropdown-text)}` while its `font-style: italic` inherits
through (pass 1's D-11, corroborated: measured `fontStyle: "italic"` on all five sub-items). The
width and gutter divergences are new. A submenu is the same menu; four simultaneous register
breaks make it read as a different component.

---

### P2-16 · INFO · The `temporary` arm is a three-row menu with no way to discard the palette

Enumerating the `v-if`s for `paletteKind === "temporary"` (`:16, :28, :49, :64, :74, :84, :94, :134,
:144, :153`): **Save** (`:15`), **Rename** (`:73`, because `paletteKind !== "remote"`),
**Export ▸** (unconditional). Delete requires `saved || (remote && isOwned)` (`:134`) — false.

So the ephemeral palettes — the Generate / Mix / Extract outputs, the ones most likely to be
unwanted — are the only kind the menu cannot dismiss. And the trash glyph floating above the list
in `evidence/desktop-light-menu-open.png` is not the missing affordance: it opens
`PalettesPane.vue:101-118`'s *“Delete all saved palettes?”* dialog — a different scope entirely
(all saved, never this temporary one). `PROPORTION-AUDIT.md` **PR-06** — *“Three adjacent action
species… REMOVE. One action/selection owner.”* — is the governing row: two destructive owners at
two scopes, and the scope the user is looking at has none.

---

## Independent corroboration of pass 1's load-bearing claims

This seat re-measured the two findings pass 1 called shipping breakage, with a different
instrument, on a correctly-seeded store.

**D-2 (destructive ink is inert) — CONFIRMED at the pixel level.** Pass 1 used computed style.
This pass sampled rendered pixels from a screenshot (`probe-D8-pass2-results.json`, light):

```
Rename ink  rgb(28, 25, 23)   contrast 13.49 : 1
Delete ink  rgb(28, 24, 22)   contrast 13.59 : 1     ΔRGB = 1
```

One unit of blue, out of 255, separates the irreversible action from the reversible one. In dark
the sampled delta is 11 — still far below any perceptual threshold at 16 px text.

**D-4 (`misconfigured` unhandled) — CONFIRMED, and the app was in that state throughout.** The
live console emits, verbatim (`probe-D6-pass2-results.json` `extract.consoleErrors[0]`):

> `[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is
> targeting the cross-origin production API … This is a dev-config error, NOT "backend offline".`

`availability.ts:39-44` declares four states; `PaletteCardMenu.vue:217` tests one. Every capture in
both passes shows `● DEV MISCONFIGURED` in the dock and an enabled, undecorated `Publish` in the
menu ten pixels away.

**D-10, D-11, D-15, D-24, D-25 — all corroborated** (header 14.384 px / `rgb(112,89,66)` /
scrollW 319 vs clientW 178; sub-items italic at 14.384 px; the 390 px submenu collision; zero
matrix coverage; item height 44 px, 4-row arm 240.1 px).

---

## What is sound — the negative proof, re-verified

1. **The trigger's tap target is correct.** Measured 54 × 54 at 390 px and 36 × 36 at 1440
   (`probe-D9-pass2-results.json`); the 44 px floor is met on touch, and the trigger appears in
   **none** of `REPORT.json`'s `smallTapTargets` rows for `/#/palettes` or `/#/browse` in any of the
   four matrices. Pass 1's D-25 measured 44 px menu items — also correct.
2. **The trigger is named.** `aria-label="Palette menu"` (`PaletteCard.vue:100`); `namelessButtons`
   for `/#/palettes` is 1 and it is not this control (the trigger carries the label; the unnamed
   button is on the picker side, present identically on `/#/` where this component does not render).
3. **Producer menu semantics are correct and consumed correctly** — `role="menu"`,
   `role="menuitem"`, `role="separator"`, `aria-haspopup`, `aria-expanded` on the sub-trigger, the
   `data-highlighted` roving walk. The component adds no ARIA of its own and breaks none.
4. **Motion has no defect** (pass 1 measured it; nothing in this pass contradicts it): producer-owned,
   collapses to `opacity`/0.15 s under `prefers-reduced-motion`, animates only composited properties,
   declares no local keyframes — edict 6 clean.
5. **`verbatimModuleSyntax` is clean** — `import type { Palette }` (`:177`),
   `import type { PaletteKind }` (`:178`).
6. **Not a god module** — 228 lines, one job, sub-components colocated (edict 1 clean).
7. **The DI seam is right** — `useApiClient()` (`:216`) reads the latch through the injected client.
   The predicate is wrong (D-4); the seam is not.
8. **The degraded-state instinct is canon-aligned** — naming the reason in-register rather than by
   toast is what `VISUAL-CONSTITUTION.md §4.1` asks for. It is applied to 2 of 10 doomed actions
   (D-13), rendered in a register that does not exist (D-17), destroys a competing fact (D-6), and
   at 1.75 : 1 cannot be read (P2-3) — but the instinct is right, and that matters for the cure.

---

## Proportion and seat law — pass-2 judgment

| canon row | verdict |
|---|---|
| `VISUAL-CONSTITUTION.md:102` — card body owns no action menu / no hover-only swatch path | **VIOLATED in whole** (D-1; P2-12 shows the hover path is still the only copy route) |
| `VISUAL-CONSTITUTION.md §4` — palette identity is `--type-subheading` | **VIOLATED to zero** — 0 px rendered at 390 px (P2-1) |
| `VISUAL-CONSTITUTION.md §4.1` — state/status explicit | VIOLATED — status at 1.75 : 1 (P2-3) |
| `VISUAL-CONSTITUTION.md §2` — one surface, one tier | VIOLATED — 41.6 % of the neighbouring entity occluded (P2-8) |
| `VISUAL-CONSTITUTION.md §7` — elevated authority by labeling **and scope** | VIOLATED — no `role="group"` (P2-7) |
| `PROPORTION-AUDIT.md §5` law 1 — a Card houses one bounded object | VIOLATED (P2-8) |
| `PROPORTION-AUDIT.md §5` law 2 — one protagonist, one identity line | VIOLATED (P2-1) |
| `PROPORTION-AUDIT.md §5` law 4 — dividers only where grouping is ambiguous | VIOLATED and **inverted** — the budget was spent on export file types (P2-6) |
| `PROPORTION-AUDIT.md §5` law 5 — every small mark is data/status/named/removed | VIOLATED — 5 unhidden decorative glyphs (P2-9) |
| `PROPORTION-AUDIT.md §5` law 8 — rendered relation beats token intent | VIOLATED (P2-1, P2-3, P2-5, P2-15) |
| `PROPORTION-AUDIT.md §5` law 12 — card root noninteractive, one named button | **VIOLATED illegally** at `/#/mix` — card nested *inside* the button (P2-2) |
| `PROPORTION-AUDIT.md` **PR-06** — one action owner | VIOLATED (P2-16) |
| `PROPORTION-AUDIT.md` **PR-07** — hover-only paths retire, survivors get names | VIOLATED (P2-12) |
| `PALETTE-CONTRACT.md:213-229, :266, :325` — exact filenames, Tailwind is data, `Download FILENAME` | VIOLATED (P2-14, D-5) |

---

## The cure, as one move

Pass 1's transposition is correct and this pass strengthens it rather than amending it:

> *“Full detail, rename/lifecycle/export actions and durable operation state live in the selected
> inspector.”* — `VISUAL-CONSTITUTION.md:102`

**Delete `PaletteCardMenu.vue`. Move its seventeen actions into the selected inspector. Reduce the
card to the single named `<button aria-pressed>` seat of `PROPORTION-AUDIT.md §5` law 12.**

What pass 2 adds is the proof that the transposition is not stylistic. P2-1 shows the card row
physically cannot hold identity + badges + chips + a 54 px menu at 390 px — the identity is what
gets deleted, today, in production layout. P2-2 shows that one consumer already had to wrap the
whole card in a button to get selection, which the menu's presence makes invalid HTML. P2-4 shows
the menu is already rendering rows nobody subscribed to. The component is not a menu that needs
fixing; it is an inspector that was built inside a 192 px transient overlay hanging off a card,
and the card cannot afford it.

Two items should not wait for the move, in addition to pass 1's D-3 and D-2:

- **P2-2** — invalid nesting at `MixSourceSelector.vue:264`, an a11y-tree hazard reachable today.
- **P2-3** — one `opacity-55` multiplying inside a `--opacity-disabled: 0.5` row, making the
  availability reason unreadable at 1.75 : 1.

---

*No source files were edited by this seat. Every artefact written lives under*
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/`. *Pass 1's report is preserved
verbatim at* `challenge-D-design.pass-1-2026-07-28.md`.

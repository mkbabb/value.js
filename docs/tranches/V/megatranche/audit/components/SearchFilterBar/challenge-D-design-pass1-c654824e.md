# CHALLENGE-D — `SearchFilterBar.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm, as
declared at spawn. The seat is not inherited and not undeclared.

---

## Subject and verdict

| | |
|---|---|
| Component | `demo/palettes/browser/search/SearchFilterBar.vue` (249 lines, area `palettes`) |
| Sole consumer | `demo/palettes/BrowsePane.vue:15-26` — slotted into glass-ui `SearchBar`'s default slot (`BrowsePane.vue:10,195`) |
| Routes | `/#/browse` (desktop + mobile, light + dark, RTL, forced-colors, 200% zoom) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| **Verdict** | **DEFECTIVE.** Three BLOCKERs, eleven MAJORs. Two of the three BLOCKERs are *lies*: the surface shows the user a state the product does not hold. |

**The gestalt.** This is a 249-line hand-rolled clone of a menu family glass-ui already ships and
that its own sibling in the same directory already uses. Every geometry, rhythm, direction and
focus defect below is downstream of that one architectural choice. The cure is not a patch; it is
a transposition onto `DropdownMenu*`, and the component drops to roughly the size of
`UserSortMenu.vue` (58 lines) in the same folder.

**The two lies.** (1) Ticking a tag paints a checked box and changes nothing — the component
speaks the *retired radix-vue* checkbox API to a *reka-era* glass-ui 7 component. (2) Typing
`hsl(200 50% 50%)` — a syntax the field's own placeholder advertises — shows "1 filter active"
while the product silently searches `#4488cc` instead. Both are measured live below.

---

## 0. What I ran

The Safari matrix in `audit/visual/` captures `/#/browse` with the popover **closed**, so the
component's entire body is unphotographed there. I drove the live dev server
(`http://localhost:9000`, read-only) with Playwright/WebKit + Chromium to open it. Two harness
notes so the numbers can be re-derived:

- The dev origin has no `VITE_API_URL`, so `demo/platform/transport/availability.ts` latches
  `misconfigured` and issues no request at all — `availableTags` is `[]` and the Tags section
  never renders. My probes rewrite that one module's `assertApiAttemptAllowed` in flight
  (`route.fetch()` → text replace → `route.fulfill`) and stub `/colors/tags`. **No repo file was
  modified.**
- Focus registers were read **settled** (900 ms after the keypress), because the swatch runs a
  200 ms `transition-shadow` and a mid-transition sample reads as a false negative. Chromium is
  used for `:focus-visible` because macOS ships Full Keyboard Access off in WebKit
  (the same caveat `audit/visual/states.mjs:6-9` records).

Probes: `probes/probe-D1..D8*.mjs`. Raw output: `evidence/measure-1..8*.json`. Frames:
`evidence/D1..D11*.png`.

---

## 1. Visual truth first

### 1.1 The popover is a lens onto the text it is covering

`PopoverContent` computes `background-color: oklab(0.936408 0.005529 0.013284 / 0.808)` with
`backdrop-filter: blur(11px) saturate(1.6)` (`evidence/measure-2…json` → `tall-ltr.contentStyle`).
80.8 % alpha over a pane whose empty state is display-scale Fraunces.

`evidence/D1-desktop-light-popover.png` — "No published palettes here yet." reads straight through
the option rows; "Most Popular" sits on top of "palettes here yet."; the `EmptyPaletteMark` dashed
circles print through the "Newest" radio glyph.

`evidence/D3-mobile-popover.png` (iPhone 14) is the worst frame in the set. The bleed-through type
is roughly **3×** the option type, so "No published / palettes here yet." dominates the menu it is
behind, and "Publish one from My Palettes and start the wall." runs across the Tier group.

`evidence/D5-forced-colors-popover.png` is *better* than the default register: WHCM forces an
opaque backdrop and the menu becomes legible. **A component whose forced-colors arm is more
readable than its ordinary arm has an ordinary-arm defect, not a WHCM one.**

`VISUAL-CONSTITUTION.md §2` — "Glass earns its blur by revealing live content; otherwise it is a
neutral well." A filter menu is not a lens on the content beneath it. Per the same table, this
surface belongs to the **specimen-well** tier ("opaque/quiet neutral stage"), not to the
instrument-veil tier ("controls genuinely over live color").

### 1.2 The menu is taller than the screen and does not scroll

Measured at 1440 × 900, `evidence/measure-1-matrices.json` → `desktop-light`:

```
content.rect   = { x: 433, y: 381, w: 240, h: 632.6 }   → bottom 1013.6
content.style  = { "max-height": "none", "overflow": "visible" }
offscreen      = true          innerH = 900
section "Find by Color".rect.y = 904.7
```

The Find-by-Color section — the swatch, the MiniColorPicker trigger, the CSS-colour field and the
Search button — begins **4.7 px below the fold** on a standard desktop and cannot be scrolled to,
because the content has no `max-height` and no internal scroller. At 200 % zoom
(`evidence/D6-zoom200-popover.png`) 2.5 of 12 options are visible; on mobile
(`evidence/D3`) the menu ends at the "TAGS" eyebrow.

It gets worse with use, not better:

| action | popover height |
|---|---|
| opened | 632.6 px |
| one filter set (Clear-all row appears) | 685.6 px (`measure-3….json` → `nested[0]`) |
| MiniColorPicker opened | + a 208 × 218.7 overlay at z 130 |

**The cause is measured, not guessed.** glass-ui `RadioGroup` is a *form* stack:

```
rgGap      = { display: "flex", flexDirection: "column", gap: "26px", rowGap: "26px" }
rgItemBox  = { w: "44px", h: "44px", padding: "0px" }
optionH    = { h: "30.9375px", padding: "4px 8px", gap: "8px" }
```
(`evidence/measure-3-dividers-badge-lane-nested.json` → `dividers`)

A 22.9 px text line costs **56.9 px of pitch** (rows at y 744.9 → 801.8 → 858.8). The Sort section
is **197.4 px tall to present 68.7 px of ink** — 2.9× dead acreage. Collapse Sort+Tier to their
natural 30.9 px pitch and the popover loses ≈134 px, i.e. it would fit a 900-tall desktop. The
overflow is entirely manufactured by using a form composition where a menu belongs.

`PROPORTION-AUDIT.md §5.7`: "Visual glyph size, operable target size and layout reservation are
separate quantities." Here all three are collapsed into one number. `PR-12` names this exact
family — "Touch padding bloats/misaligns visual glyphs — **TIGHTEN**".

### 1.3 The ragged text column

Measured left edges of the option labels inside one 206 px column
(`evidence/measure-2….json` → `tall-ltr.opts[].labelRect.x`):

| option | label x |
|---|---|
| Newest / Most Popular / Most Forked / Featured | **783** |
| All | **761** |
| pastel / neon / earth / … | **759** |

Three text origins spanning 24 px. Inside the *Tier* group alone, "All" and "Featured" are 22 px
apart, because `.filter-option` is a bare flex row with no indicator gutter and "All" carries no
icon (`SearchFilterBar.vue:34-42`). A menu family supplies that gutter as a producer invariant;
this hand-roll has to remember it per row, and did not.

### 1.4 Dark mode

`evidence/D2-desktop-dark-popover.png`. Same 0.808 alpha, so the same bleed-through; additionally
the `⋮` trigger, which reads as a bright white chip on the light field
(`audit/visual/shots/safari-desktop-light/browse.png`), collapses into a near-invisible smudge on
the dark field (`audit/visual/shots/safari-desktop-dark/browse.png`), and the `Featured` Award
glyph loses almost all separation from the surface.

### 1.5 The colour field shows 66 px of a 330 px value

```
input.clientW 146 · padding-inline-start 16 · padding-inline-end 64  → usable lane 66 px
value "oklch(0.72 0.19 45.3 / 0.85)" → scrollWidth 330, textOverflow ellipsis, whiteSpace nowrap
```
(`evidence/measure-3….json` → `longValue`)

`evidence/D8-color-field-66px-lane.png` is the rendered frame: the user sees **`/ 0.85)`** — seven
glyphs of twenty-eight. The placeholder itself (`#hex, hsl(...)`, `SearchFilterBar.vue:92`) is a
13-character string that does not fit its own field, which is exactly the clip the harvest already
recorded for the outer `SearchBar` on mobile ("Search the common", `registry/DEFECT-LEDGER.md:2571`)
— the same mechanism, one level deeper.

The 66 px is arithmetic, not accident: 240 px popover − 2×17 producer inset − 2×12 section padding
− 28 px swatch − 8 px gap − a 52.6 px absolutely-positioned Search button.

---

## 2. State coverage — the enumeration

| state | handled? | evidence |
|---|---|---|
| empty (no tags) | **NO** — `v-if="availableTags.length > 0"` (`:47`) deletes the whole section; the surface has no empty state for its own catalogue | `:47` |
| loading (tags in flight) | **NO** — no skeleton; the section pops into existence and shoves everything below it down | `:47` |
| error (tag fetch failed) | **NO** — indistinguishable from empty | `:47`; live dev origin renders exactly this |
| populated | yes | `evidence/D1` |
| searching | **DESIGNED BUT UNREACHABLE** — see D-12 | `measure-2….json` → `searchProbe.sawSpinner: false` |
| invalid colour input | **SILENTLY SUBSTITUTED** — see D-19 | `evidence/measure-8….json` |
| disabled | **NO** — the only `disabled:` styling is on the dead `searching` path | `:99` |
| focused | **PARTIAL / THREE REGISTERS** — see D-6 | `evidence/measure-6….json`, `D9`, `D10` |
| hovered | yes — `.filter-option:hover` `color-mix(… accent 50%)` | `:248` |
| active / pressed | **NO** — no `:active` register on any option | scoped block `:235-249` |
| selected | radios yes; checkboxes **paint selection the product does not hold** | D-1 |
| dragging | n/a | |
| overflowing | **NO** — popover overflows the viewport (D-2); tag list overflows its 112 px window with no affordance (D-17) | `measure-3….json` → `tagScroll` |
| truncated | **NO** — the colour field truncates its own placeholder (D-5) | `evidence/D8` |
| RTL | **BROKEN — two groups mirror opposite ways** (D-7) | `evidence/D4`, `measure-2….json` |
| reduced-motion | **PARTIAL** — geometry still transitions at 0.15 s (D-16) | `measure-1….json` → `reduced-motion` |
| forced-colors | renders, but checkbox and radio become the same mark (D-7) | `evidence/D5` |
| 200 % zoom | **BROKEN** — 2.5 of 12 options reachable | `evidence/D6` |

Six states in this component were never designed. A state that was never designed is a design
defect.

---

## 3. Findings

Ordered by severity. Every row carries file:line, a pasted measurement, or a rendered frame.

---

### D-1 · BLOCKER · The tag filter paints a checked box and changes nothing

`SearchFilterBar.vue:51-55`

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

glass-ui 7 `Checkbox` declares **`modelValue`** and emits **`update:modelValue`**
(`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts:5-19`). `checked` /
`update:checked` is the *radix-vue* spelling this repo migrated off (MEMORY §Migration:
"radix-vue → reka-ui, 192 files"). Consequences, all measured:

- `:checked` is not a declared prop, so it falls through as a raw HTML attribute — the DOM node
  carries a stray `checked` attribute alongside `aria-checked`
  (`evidence/measure-1-matrices.json` → `checkboxes[0].attrs`).
- `@update:checked` never fires, so `toggleTag` (`:197-203`) is dead and `selectedTags` never changes.
- The mark is therefore *uncontrolled*: the `selectedTags` prop cannot drive it either, so the
  parent can never clear it.

**Reproduction (live, `probes/probe-D2-tall-ltr-rtl-reduced.mjs`):** open `/#/browse` with
`/colors/tags` stubbed, open `⋮`, click the first tag checkbox.

```
cbBefore  ['false','false','false']
cbAfter   ['true','false','false']     ← the box paints checked
badgeAfter null                        ← activeFilterCount is still 0 ⇒ selectedTags is still []
```

Because `activeFilterCount` (`:189-195`) counts `selectedTags.length`, the badge is the honest
witness and it says zero. The user sees three ticked tags, no badge, no "Clear all filters" row
(it is gated on `activeFilterCount > 0`, `:110`), and results that never narrow.

**Design charge.** `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and
disabled states are never color-only. Role, accessible name, **state/value** … are explicit."
A control whose painted state contradicts the product state is not merely broken — it is a false
statement to the user. Owner edict 2 forbids exactly this class of survival ("no legacy code — no
aliases, migration shims, dual paths").

**Cure.** Not a prop rename. `DropdownMenuCheckboxItem` owns checked-state, the indicator gutter,
the label and the roving keyboard model in one node — see D-4.

---

### D-2 · BLOCKER · The menu is 632.6 px tall in a 900 px viewport, does not scroll, and grows with use

Numbers in §1.2. `max-height: none`, `overflow: visible`, `offscreen: true`, "Find by Color" at
y 904.7 against `innerHeight` 900.

Cross-check with the seat law: `VISUAL-CONSTITUTION.md §5.1` requires "Dialog/Drawer/Popover open
and close → producer initial-focus rule on open … preserve underlying document scroll." The
underlying scroll is preserved, so there is *no* path to the lower half of this overlay at 1440×900
— not the page, not the popover.

`PROPORTION-AUDIT.md §1`: "Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist." Three sort options do not earn 197.4 px.

**Cure.** Transposition (D-4) removes ≈134 px of manufactured pitch. The residual — a genuinely
long tag catalogue — belongs in `DropdownMenuContent`'s producer max-height + scroll, not in a
nested 112 px `max-h-28` window inside an unscrollable overlay (D-17).

---

### D-3 · BLOCKER · An 80.8 %-alpha menu over live display type

Numbers and frames in §1.1. `background-color: oklab(… / 0.808)`, `backdrop-filter: blur(11px)
saturate(1.6)`; `evidence/D1`, `D3` show the collision; `evidence/D5` (forced-colors, opaque)
proves the ordinary register is the defective one.

`VISUAL-CONSTITUTION.md §2` material table + "One surface has one tier. An inner card is not
automatically another pane of glass. Glass earns its blur by revealing live content; otherwise it
is a neutral well."

**Cure.** The filter menu is a **specimen-well / opaque quiet** surface. This is a producer-tier
selection (`glass-floating` → an opaque menu tier), which means it belongs in the glass-ui BH relay,
not in a `!important` in `SearchFilterBar.vue`'s scoped block. Note the same `popover-content
z-popover glass-floating` class string is what `DropdownMenuContent` would carry, so the tier
decision must be made at the producer either way.

---

### D-4 · MAJOR · The component hand-rolls a glass-ui family that its own sibling already consumes

glass-ui 7 ships the complete menu vocabulary:

```
$ ls node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/
DropdownMenu.vue.d.ts           DropdownMenuLabel.vue.d.ts       DropdownMenuSeparator.vue.d.ts
DropdownMenuCheckboxItem.vue.d.ts DropdownMenuRadioGroup.vue.d.ts DropdownMenuSub*.vue.d.ts
DropdownMenuContent.vue.d.ts    DropdownMenuRadioItem.vue.d.ts   DropdownMenuTrigger.vue.d.ts
DropdownMenuGroup.vue.d.ts      DropdownMenuItem.vue.d.ts        useMenuTrigger.d.ts
```

All fourteen are already re-exported at `demo/ui/dropdown-menu/index.ts`. And the *only* demo
consumer of them is `demo/palettes/browser/search/UserSortMenu.vue` — the file **next to this one,
exported from the same barrel** (`search/index.ts:3-5`), doing **the same job**: an
`EllipsisVertical` icon-only trigger opening a sort radio menu.

```vue
<!-- UserSortMenu.vue:2-36 — 58 lines total -->
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <!-- S.W5-4: the triplicated hand-rolled icon-trigger recipe dies onto the sanctioned glass-ui atom (+ the missing name). -->
    <Button icon-only variant="ghost" size="xs" aria-label="Sort users" class="shrink-0">
  …
  <DropdownMenuContent align="end" class="w-48 font-display">
    <DropdownMenuLabel class="text-micro">Sort</DropdownMenuLabel>
    <DropdownMenuRadioGroup :model-value="sort" @update:model-value="…">
      <DropdownMenuRadioItem value="newest" class="text-small cursor-pointer gap-2">
```

`SearchFilterBar.vue` is the **surviving copy of the recipe that comment says was retired**: 249
lines of `Popover` + form `RadioGroup` + form `Checkbox` + `.filter-section` + `.section-label` +
`.filter-option` + `divide-y`, reconstructing `DropdownMenuLabel`, `DropdownMenuRadioItem`,
`DropdownMenuCheckboxItem` and `DropdownMenuSeparator` by hand.

Owner edict 4 ("Glass-ui is the design system… Reuse existing component-type names") and edict 3
(KISS, no contrivance). Owner edict 1 also bites: at 249 lines with 4 props, 6 emits, 5 local refs,
its own hex→OKLab conversion and its own dead async state, this is a small god module for one
filter surface.

**Downstream defects this one choice manufactures:** D-2 (26 px form gap), D-8 (44 × 44 vs 16 × 16),
D-9 (no indicator gutter → ragged column), D-10 (hand-rolled dividers), D-6 (mixed focus registers),
D-7 (no `dir` plumbing), and the total absence of menu typeahead and Home/End.

**Cure — architectural transposition, not a patch.**

```
Popover                      → DropdownMenu
PopoverTrigger + Button      → DropdownMenuTrigger + Button icon-only size="xs"   (as UserSortMenu)
.section-label div           → DropdownMenuLabel
RadioGroup / RadioGroupItem  → DropdownMenuRadioGroup / DropdownMenuRadioItem
Checkbox + label             → DropdownMenuCheckboxItem
divide-y divide-border       → deleted (D-10) or DropdownMenuSeparator where genuinely ambiguous
Find-by-Color row            → DropdownMenuSub, or lifted out of the menu entirely (D-19)
```

---

### D-5 · MAJOR · The colour field is 66 px wide and truncates its own placeholder

Numbers and frame in §1.5. `laneW = 66`, `scrollWidth = 330` for a 28-character OKLCH value,
rendered as `/ 0.85)` (`evidence/D8-color-field-66px-lane.png`).

`VISUAL-CONSTITUTION.md §4`: "Live numbers use tabular figures and **reserve their widest legal
representation** so value changes never reflow the settled chassis." The widest legal
representation of this field's own advertised grammar is ~30 characters; it reserves 7.

**Cure.** Find-by-Colour is not a menu row. It is a second instrument. Either give it the full
inline measure of a `DropdownMenuSub` panel, or lift it out of the `⋮` menu into the Browse filter
region where a colour value has room — which is also the cure for D-19 and for the "search/filter
chrome is one family" law (`VISUAL-CONSTITUTION.md §7 · Palette library and Browse`).

---

### D-6 · MAJOR · Three focus registers in one 240 px popover, one of them empty

Settled `:focus-visible`, Chromium, real `Tab` presses, 900 ms settle
(`probes/probe-D6-settled-focus.mjs`, `evidence/measure-6-settled-focus.json`):

| control | outline | box-shadow |
|---|---|---|
| `role=radio` (Sort, Tier) | `none / 3px` → **`outline-style: none`** | **`none`** |
| `role=checkbox` (Tags) | `none` | `color(srgb 0.6655 0.0001 0.2617 / .3) 0 0 0 2px, … 0 0 8px` |
| colour field `<input>` | `none` | same producer ring |
| swatch trigger | `none` | same producer ring |
| **`Search` button** | **`auto / 1px / rgb(0,95,204)`** — the *browser default* | `none` |

**Pixel proof for the radios** (`probes/probe-D7-focus-pixel-proof.mjs`): the same 230 × 209 clip
of the Sort section, unfocused vs. keyboard-focused on the checked radio
(`activeElement: {role: "radio", "data-state": "checked", ":focus-visible": true}`):

```
$ python3 …  # decode both IDATs and compare raw bytes
dims 230 209 230 209   bytes equal: False   len 144419 144419
differing bytes: 79 of 144419        (0.055 % — ambient-gradient dither, not a ring)
```

`evidence/D9-radio-unfocused.png` and `evidence/D9-radio-keyboard-focused.png` are visually
identical. Compare `evidence/D10-checkbox-keyboard-focused.png`, where the crimson ring is obvious.

`VISUAL-CONSTITUTION.md §4.1`: "Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency." Two of the five Sort/Tier keyboard stops have no focus
affordance at all, and a third control uses Chrome's default blue in a Fraunces/Fira/cartoon system.

**Sub-finding (producer-owned → BH relay).** `.focus-ring:focus-visible` in glass-ui's shipped CSS
is `{ outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` —
it **replaces** rather than composes. On the swatch, which carries `shadow-cartoon-sm` (`:76`), the
measured shadow goes from

```
unfocused:  oklab(0.28 …/.32) -2px 2px 0 0, … -3px 3px 0 0, … -4px 4px 0 0     (cartoon elevation)
focused:    color(srgb .6655 …/.3) 0 0 0 2px, … 0 0 8px 0                       (ring only)
```

so the swatch's material elevation is **deleted** on focus, and `transition-shadow` animates that
material drop over 200 ms. This repo already learned this exact lesson and wrote it down —
`demo/styles/utils.css:140-145`: *"Compose, never replace: the producer's focus ring joins the
stamp (the unlayered base box-shadow above would otherwise silently beat the layered
`.input-bar:focus-within` ring)"* — and `demo/styles/focus-ring.css:9-15` records the U-F25 death
of the same family. The discipline was applied to `.search-seated` and not here.

---

### D-7 · MAJOR · Two selection semantics, one mark; and RTL mirrors them in opposite directions

**Same mark.** `role=radio` → `border-radius: 50%`, 44 × 44. `role=checkbox` → `border-radius:
9999px`, 16 × 16 (`evidence/measure-2….json` → `radios[]`, `cbs[]`). Both are circles. In
`evidence/D5-forced-colors-popover.png` they are indistinguishable: the "pastel/neon/earth"
multi-select marks are the same ring as the "All/Featured" single-select marks. Nothing in the
surface tells the user that Sort and Tier are exclusive and Tags is cumulative.

**Opposite mirroring.** At `document.documentElement.dir = "rtl"`
(`evidence/measure-2….json` → `tall-rtl`):

```
opts["Newest"].dir  = "ltr"    radio  x=526  (section spans 519 … 725 → inline-START is 725)
opts["pastel"].dir  = "rtl"    checkbox x=689 …705
radios[].parentDirAttr = "ltr"
```

`evidence/D4-rtl-desktop-popover.png` shows it: the SORT/TIER eyebrows right-align, their option
rows stay left-to-right, and the TAGS rows flip. glass-ui's `RadioGroup` accepts `dir?: Direction`
(`RadioGroup.vue.d.ts:10`); the consumer never passes it, so reka's RovingFocusGroup stamps
`dir="ltr"` and pins the group against the document.

`VISUAL-CONSTITUTION.md §6.1`: "chrome, navigation and layout → logical inline/block direction
follows the document."

Also physical-side hard-codes in the colour row: `pr-16` (`:94`) and `absolute right-1` (`:99`).
They happen to agree with each other, so nothing overlaps — but in RTL the **Search action lands at
the reading START of the field**, inverting the type-then-search grammar, and the value sits behind
a 64 px start inset with a 16 px end inset (`padding-inline-start: 64px` / `-end: 16px`, measured).

---

### D-8 · MAJOR · A 16 × 16 target beside a 44 × 44 target — 7.6× area difference between peers

```
radios[].r  = { w: 44, h: 44 }      cbs[].r = { w: 16, h: 16 }
```
(`evidence/measure-2….json`)

16 × 16 is below the WCAG 2.2 SC 2.5.8 (minimum) 24 × 24 floor. The visual audit's own tap-target
sweep did not catch it because the popover was closed in every one of the 60 captures
(`audit/visual/REPORT.json` → `/#/browse` `smallTapTargets` lists four 22 × 22 slug-bar controls only).

Simultaneously the radio's 44 px target is *reserving layout* — it overflows its own 30.9 px row by
6.55 px on each side and is the reason the option pitch is 56.9 px. `PROPORTION-AUDIT.md §5.7`
separates glyph / target / reservation; this component conflates them in **both** directions at
once inside one 240 px surface.

---

### D-9 · MAJOR · Ragged label column — three text origins in a 206 px column

Table in §1.3: 783 / 761 / 759. Within the *Tier* group alone the two rows differ by 22 px.

`PROPORTION-AUDIT.md §5` (card and micro-UI laws) and §1 ("relational, not ornamental"): a two-item
exclusive group whose two labels do not share a left edge has no relation to read.

---

### D-10 · MAJOR · Three dividers where the binding inventory says zero

`SearchFilterBar.vue:17` — `<div class="flex flex-col divide-y divide-border">`. Measured
(`evidence/measure-3….json` → `dividers.children`):

```
filter-section  border-bottom: 1px / rgb(198, 180, 159)
filter-section  border-bottom: 1px / rgb(198, 180, 159)
filter-section  border-bottom: 1px / rgb(198, 180, 159)
filter-section  border-bottom: 0px
```

`VISUAL-CONSTITUTION.md §4.2`: "The binding value.js inventory in `OPTICAL-BENCH-COMPOSITIONS.md §5`
selects `[]` and `reserve="none"` … **Only the five Admin lists retain a non-P122 adjacent-row
separator; every other composition retains no divider.**" `PROPORTION-AUDIT.md §5.4`: "A divider is
retained only when grouping would be ambiguous without it. Spacing plus material already expressing
the same boundary makes the line duplicative." Each section here already carries an uppercase
eyebrow **and** 12 px of padding **and** 26 px of internal gap — the rule is the third encoding of
one boundary. `PR-05` is the family row ("Dividers … repeat a boundary — **REMOVE**"); `PR-14`
already ruled the identical mechanism for About ("repeated dividers 7→0").

---

### D-11 · MAJOR · The badge counts the wrong set and is never announced

`SearchFilterBar.vue:189-195`

```ts
const activeFilterCount = computed(() => {
    let count = 0;
    if (tier) count++;
    count += selectedTags.length;      // ← can never be non-zero: D-1
    if (colorSearchActive.value) count++;
    return count;
});
```

- It **excludes the sort mode**, which lives inside this very popover — so a control the menu owns
  is not counted by the menu's own indicator.
- It **excludes the free-text query**, which lives in the `SearchBar` this trigger is physically
  slotted into (`BrowsePane.vue:10-27`). The harvest already recorded the downstream consequence:
  a text-filtered-empty wall shows no badge (`registry/DEFECT-LEDGER.md:2481`).
- Its tag term is structurally dead (D-1).

**It is also announced to nobody.** The trigger carries `aria-label="Filters"` (`:5`), which
overrides its content, and the badge is not `aria-hidden`. Measured AX name of the trigger with one
filter set: `{ role: "button", name: "Filters" }` (`evidence/measure-5-accessible-names.json`).
The count is a colour-and-glyph-only state — `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed,
pending, withdrawn and disabled states are never color-only… state/value … explicit."

Geometry (`evidence/measure-3….json` → `badge`, frame `evidence/D11-badge.png`):

```
badge  { x: 926.1, y: 635.3, w: 16.2, h: 16.2 }   trigger { x: 905.8, y: 639.4, w: 32.5, h: 40.6 }
overflowsTop: true    overflowsRight: true         (4.1 px above, 4.0 px right of the trigger)
style  { fs: "11px", fw: "700", bg: oklch(0.470927 0.096235 89.834023), color: rgb(251,250,248) }
```

11 px / weight 700 is `text-micro` bold — a rung the closed type matrix (`§4`) does not contain, and
its "control or label" rung is explicitly **non-bold**. I checked and must record the negative: the
badge is **not** clipped by any ancestor (`evidence/measure-4….json` → `chromium_badgeClip.clippers[].clipsBadge: false`).

---

### D-12 · MAJOR · A designed loading state that can never paint

`SearchFilterBar.vue:213-225`

```ts
async function applyColorSearch() {
    if (searching.value) return;
    searching.value = true;
    try {
        …
        emit("colorSearch", lab.L, lab.a, lab.b);   // no await anywhere in this body
    } finally {
        searching.value = false;
    }
}
```

There is no `await`, so `searching` is set and cleared inside one synchronous tick and Vue never
renders the truthy branch. **Reproduction** (`probes/probe-D2….mjs`, MutationObserver over the
button across a 400 ms window):

```
searchProbe = { sawSpinner: false, htmlAfter: "<span …>Search</span>", disabled: false }
```

Dead by construction: `Loader2` + `animate-spin` (`:102`), `:disabled="searching"` (`:98`), and the
four `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` utilities
(`:99`). The real work is asynchronous in the parent, so the pending truth the designer intended
exists nowhere. `VISUAL-CONSTITUTION.md §5`: "Persistent operation state stays with the
entity/workspace."

---

### D-13 · MAJOR · The nested picker occludes its own parent and is pointer-only

`evidence/D7-nested-minicolorpicker.png` + `evidence/measure-3….json` → `nested`:

```
parent  popover-content z-popover glass-floating  { x:698, y: 684, w:240, h:685.6 }  z 130  bg …/0.808
child   popover-content z-popover glass-floating  { x:727, y:1028, w:208, h:218.7 }  z 130  bg …/0.808
```

`MiniColorPicker.vue:6` opens `side="top" align="start"`, so the child lands **on top of** the
parent's Tags list and its own "FIND BY COLOR" eyebrow. Same z-index, same 80.8 % alpha, so the tag
rows print through it. The frame shows **two swatches and two identically-labelled `Search` buttons
on screen simultaneously** — `PROPORTION-AUDIT.md PR-06` ("Three adjacent action species or
duplicated selected fills — **REMOVE**"; here the popover carries four species: glass-ui `Button`
ghost trigger, a raw `<button>` swatch, a raw `<button>` Search, and a full-width glass-ui `Button`
Clear-all).

Keyboard: `evidence/measure-3….json` → `nestedA11y`

```
[{ tag: "DIV", role: null, tabindex: null, label: null, cls: "sv-canvas relative w-full h-28 …" }]
```

The saturation/value canvas and the hue strip (`MiniColorPicker.vue:8-36`) are bare `<div>`s with
`pointerdown/move/up` and nothing else. `VISUAL-CONSTITUTION.md §5`: "Tuning is continuous and
interruptible; **every spatial action has a keyboard/numeric equivalent**"; §5.2 further specifies
the two-named-axis law for spectrum coordinates. Neither exists.

---

### D-19 · MAJOR · The field advertises `hsl(...)`, accepts it, shows "1 filter active", and searches a different colour

`SearchFilterBar.vue:92` placeholder: `"#hex, hsl(...)"`. `SearchFilterBar.vue:218`:

```ts
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

Anything that is not a 6-digit hex is **silently replaced** by the swatch's colour. Owner edict 2
names this species directly: "no masking fallbacks."

**Reproduction (live, `probes/probe-D8-colour-substitution.mjs`)** — type into the field, click
`Search`, read the badge and the swatch:

```json
"hsl(200 50% 50%)": { "badge": "1", "inputValue": "hsl(200 50% 50%)",
                      "swatchLabel": "Open color picker, current color #4488cc",
                      "swatchFill": "rgb(68, 136, 204)" },
"rebeccapurple":    { "badge": "1", "inputValue": "rebeccapurple",   "swatchFill": "rgb(68, 136, 204)" },
"#ff0000":          { "badge": "1", "inputValue": "#ff0000",         "swatchFill": "rgb(68, 136, 204)" }
```

The field keeps the user's text, the badge asserts an active colour filter, and the searched colour
is `#4488cc` in all three cases. Note the third row: **even for a valid hex the swatch never
updates**, because `applyColorSearch` sets `colorSearchActive` but not `pickerHex` (only
`onPickerHexUpdate`/`applyColorSearchFromPicker` do, `:175-187`). The two entry paths produce
divergent visual truth for the same state.

The irony is load-bearing: this is a colour library's own demo, `parseColorIn` is already imported
one line above (`:145`, used at `:206`), and it parses `hsl()` and named colours. The hex regex is a
gate the product does not need.

---

### D-14 · MINOR · Per-instance overrides that lose to the producer

| site | authored | computed | verdict |
|---|---|---|---|
| `:16` `PopoverContent class="w-60 p-0"` | `p-0` | `padding: 20.352px 16px` | `p-0` **inert** — the producer inset survives, so sections sit inside 16 px producer + 12 px own = 29 px per side on a 240 px surface |
| `:5` `Button class="relative h-8 w-8"` | 32 × 32 | `height 40px`, `min-height 40px`, `width 32px` | `h-8` **inert** — the "icon-only circle" is a 32 × 40 pill |
| `:239` `.filter-section > .section-label { margin-bottom: 0.375rem }` | — | — | per-instance override of a producer recipe |

(`evidence/measure-2….json` → `contentStyle.padding`, `trigger.style`.)

Owner edict 5: "Style at the shadcn/glass root component level, never per-instance overrides."
`ButtonSize` already includes `"xs"` (the harvest records this at
`registry/harvest/wf_9bd0ecd0-037.json:339`, a 22-site census), and `UserSortMenu.vue:9` uses it.

---

### D-15 · MINOR · Type roles outside the closed matrix; and a token whose name lies

Measured (`evidence/measure-1….json` → `sections[].labelStyle`, `opts[].labelStyle`):

```
.section-label  Fira Code, 14.384px, uppercase, letter-spacing 1.4384px, weight 400
.filter-option  Plus Jakarta Sans, 16.4px  (= --type-small at 1440px ✓)
badge / Search  11px  (= --type-micro)
```

`.section-label` is a legitimate glass-ui recipe (`dist/styles/typography/utilities.css` →
`.section-label { @apply text-mono-caption; color: var(--muted-foreground) }`), so this is a *role
choice*, not a hand-roll. But `VISUAL-CONSTITUTION.md §4` closes the matrix: section headings are
`text-heading` / Plus Jakarta Sans, and Fira Code is reserved for "value, code, or provenance".
"SORT", "TIER", "TAGS", "Find by Color" are none of those. `text-micro` (11 px) is not in the matrix
at all, and the control rung is explicitly non-bold — the badge is weight 700.

**The token trap.** `.filter-option` (`:243`) reaches `font-family: var(--font-serif)`, and on this
route

```
--font-serif = "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif
```
(`evidence/measure-2….json` → `tokens`). The component renders the *correct* family through a token
whose name promises the *wrong* one. Any future correction of `--font-serif` to an actual serif
silently re-faces every filter option in the app's primary discovery surface. Reach the **role**
(`text-small`), not the family.

---

### D-16 · MINOR · Three spellings of one motion intent; reduced-motion still animates geometry

| site | motion |
|---|---|
| `:246` `.filter-option` | `background-color var(--duration-fast) var(--ease-standard)` — tokenized ✓ (measured 0.2 s) |
| `:76` swatch | bare Tailwind `transition-shadow` (+ `hover:shadow-cartoon-md`) — untokenized |
| `:99` Search | `transition-colors duration-fast` |

`--animation-slide-sm` and `--animation-slide-md` both resolve to the **empty string** on this route
(`evidence/measure-2….json` → `tokens`), so the named slide family the standing edict cites is not
available here at all — worth recording for the family row, though this component does not reach
for it.

**Reduced motion.** `demo/styles/animations.css:184-190` declares a global
`transition-duration: 0.01ms !important` guard. Under `prefers-reduced-motion: reduce` the popover
nonetheless computes

```
transition-property: scale, translate, opacity, filter, display, overlay
transition-duration: 0.15s        (vs 0.35s, 0.35s, … in the default arm)
```
(`evidence/measure-1….json` → `reduced-motion.contentStyle`). glass-ui's own reduced arm wins the
cascade, so `scale`/`translate` — geometry — still animate for a user who asked for no motion.
`VISUAL-CONSTITUTION.md §6`: "Reduced motion resolves directly to the final geometry and stable
chromatic state." **Producer-owned → BH relay**, recorded here because this component is where it
was observed.

---

### D-17 · MINOR · A 3.4-of-7 tag window nested inside an overlay that already overflows

`SearchFilterBar.vue:49` — `class="max-h-28 overflow-y-auto scrollbar-thin"`. Measured with 7 tags:

```
tagScroll { rect: { h: 112 }, scrollH: 252, clientH: 112,
            style: { "max-height": "112px", "overflow-y": "auto", "mask-image": "none" } }
```

3.4 rows of 7 visible, no fade/mask/count to say the list continues, inside an overlay whose own
lower half is already below the fold (D-2). And the whole section is `v-if="availableTags.length > 0"`
(`:47`), so an empty **or failed** tag catalogue is rendered as *the section does not exist* — which
is what the live dev origin actually does today.

---

### D-18 · INFO · Import-path dual road (family row, not this component's alone)

`SearchFilterBar.vue:129-133` imports `Button`, `Input`, `Popover*`, `RadioGroup*`, `Checkbox`
through `demo/ui/*` one-line re-export shims; its parent imports `SearchBar` straight from the
producer (`BrowsePane.vue:195`). `demo/ui/checkbox/index.ts` is, verbatim:

```ts
export { Checkbox } from "@mkbabb/glass-ui";
```

Owner edict 2 forbids aliases. Repo-wide pattern; recorded so the mega-tranche can carry it as one
family row rather than 88 component rows.

---

## 4. Cross-checks against the visual audit

`audit/visual/REPORT.md` records `/#/browse` as clean on every automated axis: 0 page errors, 0
console errors, 0 horizontal overflow, `main` = 1, `smallTapTargets` = 4 (all 22 × 22 slug-bar
controls, per `REPORT.json`), `namelessButtons` = 0. **All 60 captures have the popover closed**, so
the sixteen defects above are invisible to that sweep. Two consequences for the mega-tranche:

1. The visual matrix needs an **interaction arm** — every overlay opened at least once per matrix —
   or its green rows are green about a surface nobody photographed.
2. The two rows the matrix *did* catch on this route belong to this component's seam and corroborate
   it: the mobile placeholder clip (`Search the common`) and the RTL head-clip (`earch the commons`)
   are both caused by `SearchFilterBar` being slotted into `SearchBar`'s text lane without a reserve
   (`registry/DEFECT-LEDGER.md:2571`). The twin "Search your palettes…" field in the same viewport,
   which has no slotted trigger, renders whole — visible side by side in
   `audit/visual/shots/safari-desktop-light/browse.png`.

`VISUAL-CONSTITUTION.md §7 · Palette library and Browse`: "**Search/filter chrome is one family.**"
Today the two search fields on the same screen are not one family: one carries a filter affordance
inside its text lane, the other carries none, and neither the Library nor Browse exposes the same
filter set.

---

## 5. The cure, in one shape

Not a patch list. One transposition and two subtractions:

1. **Transpose onto `DropdownMenu*`** (D-4). This alone discharges D-2's manufactured pitch, D-8's
   two target-size failures, D-9's ragged column, D-10's dividers, D-6's mixed focus registers,
   D-7's `dir` split, and gives the surface roving focus, typeahead and Home/End it does not have.
   `UserSortMenu.vue` in the same directory is the working reference and the size target.
2. **Lift Find-by-Colour out of the menu** (D-5, D-13, D-19). A CSS colour value is not a menu row;
   it needs measure, a keyboard-operable spectrum, one Search action instead of two, and
   `parseColorIn` instead of a hex regex. Put it in the Browse filter region beside the search
   field, where "search/filter chrome is one family" can actually be satisfied.
3. **Make the surface opaque and make the state honest** (D-3, D-1, D-11, D-12, D-19). One
   producer-tier change (opaque menu surface, via the BH relay), one API correction that must be a
   `DropdownMenuCheckboxItem` rather than a prop rename, one count that includes everything the
   surface owns and is announced, and the deletion of the unreachable `searching` branch in favour
   of state that lives with the operation.

---

## 6. Ledger

| id | severity | one line |
|---|---|---|
| D-1 | BLOCKER | Tag checkboxes paint checked state the product never holds (retired radix-vue API) |
| D-2 | BLOCKER | 632.6 px popover in a 900 px viewport, no scroll, grows with use; Find-by-Colour unreachable |
| D-3 | BLOCKER | 80.8 % alpha menu over display-scale body copy — illegible; forced-colors is *better* |
| D-4 | MAJOR | Hand-rolled clone of `DropdownMenu*`, which the sibling `UserSortMenu.vue` already uses |
| D-5 | MAJOR | Colour field: 66 px lane for a 330 px value; truncates its own placeholder |
| D-6 | MAJOR | Three focus registers; the two radio groups have none (pixel-proved) |
| D-7 | MAJOR | Checkbox and radio are the same mark; RTL mirrors the two groups opposite ways |
| D-8 | MAJOR | 16 × 16 tag target beside a 44 × 44 radio target — below the 24 × 24 floor |
| D-9 | MAJOR | Three label origins (783 / 761 / 759) in a 206 px column |
| D-10 | MAJOR | Three dividers where the binding inventory says zero |
| D-11 | MAJOR | Badge omits sort and text query, is structurally dead for tags, and is never announced |
| D-12 | MAJOR | `searching` spinner + disabled state can never paint (no `await`) |
| D-13 | MAJOR | Nested picker occludes its parent at the same z and alpha; canvas is pointer-only |
| D-19 | MAJOR | Field advertises `hsl(...)`, then silently searches `#4488cc` and claims "1 filter" |
| D-14 | MINOR | `p-0` and `h-8` are inert per-instance overrides; `size="xs"` exists |
| D-15 | MINOR | Fira Code section headings + 11 px bold badge outside the closed matrix; `--font-serif` is a sans |
| D-16 | MINOR | Three motion spellings; reduced-motion still runs a 0.15 s geometry transition |
| D-17 | MINOR | 3.4-of-7 tag window with no continuation affordance; no empty/error state for the catalogue |
| D-18 | INFO | `demo/ui/*` alias shims vs. direct producer imports in the same subtree |

**Strongest single defect: D-1.** Not because it is the largest, but because it is the one where the
interface makes a false statement to the user and the product agrees to display it.

---

## 7. Files

- Report — `docs/tranches/V/megatranche/audit/components/SearchFilterBar/challenge-D-design.md`
- Frames — `…/SearchFilterBar/evidence/D1…D11*.png`
- Raw measurements — `…/SearchFilterBar/evidence/measure-1…8*.json`
- Re-runnable probes — `…/SearchFilterBar/probes/probe-D1…D8*.mjs` (read-only; they rewrite one
  module *in flight* and stub `/colors/tags`; they never touch the repo)

No source file was edited by this seat.

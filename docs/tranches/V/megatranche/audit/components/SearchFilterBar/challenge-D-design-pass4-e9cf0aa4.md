# CHALLENGE-D — `SearchFilterBar.vue` · the design is flawed — **PASS 4**

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context arm), as
declared at spawn. The seat is **declared, not inherited, not defaulted**.

---

## 0. Standing of this document

Three CHALLENGE-D seats ran before me. Per the pass discipline I ran **every probe to completion
and wrote its JSON to disk before opening a single prior report**. All four artifacts survive:

| file | what it is |
|---|---|
| `challenge-D-design-pass1-c654824e.md` | pass 1 (D-1…D-19) |
| `challenge-D-design-pass2-c654824e.md` | pass 2 (D2-B1…D2-m5) |
| `challenge-D-design-pass2-hydrated-payload.md` | pass 2, structured-payload form |
| `challenge-D-design-pass3-f36f780c.md` | **pass 3, preserved verbatim by me at the start of this session** |
| **this file** | **pass 4** |

This pass does five things:

1. **Independently re-derives** the headline results on a fourth harness — a different API-stub
   mechanism (a LAN-origin request that defeats the dev misconfig latch rather than a module-path
   glob), a different device scale (DPR 3), and a *populated* tag catalogue that no prior pass
   appears to have had at desktop.
2. **Settles three prior disputes with mechanism, not opinion** — the badge clip, the radio focus
   register, and `variant="ghost"`. Two priors are confirmed; **one prior MAJOR is overturned**,
   and I overturn one of my own readings in the same paragraph.
3. **Adds five findings no prior ledger contains**, including the one that reframes the whole
   component: *the producer already solved the touch-target/optics problem, and this component
   undid the solution by inserting a `<label>`.*
4. **Enumerates the full state matrix** the brief demands, with a measured row for each.
5. **States its negative proofs** — five axes I attacked and could not break, so the next pass
   does not re-spend the budget.

| | |
|---|---|
| Component | `demo/palettes/browser/search/SearchFilterBar.vue` — 249 lines (125 template), area `palettes` |
| Sole consumer | `demo/palettes/BrowsePane.vue:15-26`, slotted into glass-ui `SearchBar`'s default slot (`BrowsePane.vue:10`) |
| Route | `/#/browse` only |
| Subject state | `git diff --stat c654824e HEAD -- demo/palettes/browser/search/` → **empty**; the subject is byte-identical to the declared `c654824e`. Working tree HEAD at probe time `e9cf0aa4`. |
| Producer | `@mkbabb/glass-ui` **7.0.0** (`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`) |
| **Pass-4 verdict** | **DEFECTIVE.** 5 BLOCKER · 9 MAJOR · 4 MINOR · 2 INFO |

**Evidence base (all reproducible):**

```
docs/tranches/V/megatranche/audit/components/SearchFilterBar/
  probe-P4-1.mjs … probe-P4-7-adjudicate.mjs     ← the harnesses
  evidence-p4/p4-1.json … p4-7.json              ← the measurements
  evidence-p4/*.png                              ← the frames
```

All probes drive the **live** dev server. The `demo/`, `src/`, `test/` trees are untouched; the
API is stubbed at the Playwright network layer only.

> **Harness note worth recording.** `http://localhost:9000` cannot exercise this component's real
> states at all: `demo/platform/transport/availability.ts:114-116` trips the dev-misconfig latch on
> any loopback hostname, so **zero** API requests are issued and `availableTags` is permanently
> `[]`. Every capture in `audit/visual/shots/**/browse.png` was therefore taken with the Tags
> section absent and the wall in its error arm. I probed through `http://192.168.1.166:9000`
> (`isLoopbackHost` false → requests fire → my stub answers). **Any pass that measured this
> component on `localhost` measured a component with a third of its body missing.**

---

## 1. Verdict in one paragraph

`SearchFilterBar` is a **menu built out of a form**. Its two primary lists are glass-ui
`RadioGroup`s — a form control whose producer CSS is calibrated for bare 18px circles in a
column — with a full-width `<label>` interposed between the group and each item. That single
structural decision produces, by arithmetic and by measurement, a 56.93px row pitch for a 30.94px
row (45.7% dead space), option rows that shrink-to-fit into five different widths in a 182px
column, and a hover target that is 2.71× wider on one row than another. The third list, written by
hand, has a 32.94px pitch — so **one 240px menu contains two rhythms that differ by 1.73×**. On top
of that structural error sit four independent state failures, each of which makes the surface
assert something the product does not hold: the Tags filter speaks a retired producer API and does
nothing; the count badge renders as a gold crescent with no digit; the menu's last section is
112.63px below the fold with `max-height: none`; and the colour field advertises `hsl(...)` while
accepting only `#RRGGBB`, silently searching the swatch colour for all six syntaxes I fed it —
including the product's own `oklch()`.

---

## 2. Visual truth — the frames first

### 2.1 The shipped Safari matrix (`audit/visual/shots/`)

`REPORT.md:121,136,151,166` — `/#/browse` in all four Safari matrices: 0 page errors, 0 console
errors, 0 horizontal overflow, `main` = 1, **`h1` = 0**, **4 small tap targets**. Those four rows
are the *closed* state; the trigger is the only part of this component rendered.

The route's shipped frame is the **error arm** (`shots/safari-desktop-light/browse.png`): "The
commons is unreachable. / Failed to load palettes / Retry". The filter trigger sits directly above
it, **fully enabled**, offering to sort and tier-filter and colour-search a wall that does not
exist. No state in this component consults `browseError`.

### 2.2 The trigger, magnified 5× from the shipped Safari capture

`evidence-p4/trigger-safari-desktop-light.png` · `trigger-safari-desktop-dark.png` ·
`trigger-rtl.png` (crops of `shots/{safari-desktop-light,safari-desktop-dark,rtl-desktop}/browse.png`)

Three things are visible without any code:

1. **The button breaks the field's silhouette.** A vertical lozenge pokes above and below the
   search pill's rounded rect. Measured (`p4-1.json`): trigger `top 335.67 / bottom 375.67`,
   host `.input-bar.search-seated` `top 337.67 / bottom 373.67` — **2.00px proud at the top and
   2.00px proud at the bottom**. In RTL, identically (`p4-3.json`
   `triggerOverflowsFieldBlock: {top: 2, bottom: 2}`).
2. **It is not a circle and not a square.** Measured **32 × 40**, `border-radius: 9999px` → an
   *ellipse*. The `EllipsisVertical` glyph inside is 16×16 and centred in a 32×40 field, so the
   optical centre of the icon sits in a box with a 0.8 aspect.
3. **In dark it is invisible except for a hairline.** `trigger-safari-desktop-dark.png`: the
   button's fill and the field's fill are the same value; the only thing separating them is the
   producer's 1px specular ring, which reads as a stray ellipse half in and half out of the pill.

### 2.3 The open menu, over the shipped route state

`evidence-p4/p4-webkit-light-open-crop.png` and `p4-popover-full-tall.png`

The page's own copy reads **through** the menu and collides with it: `…ns is unreachable.`,
`load palettes`, `Retry`, `· COMMONS ·`, `palettes here yet.`, `from My Palettes and`, `t the
wall.`, and the dashed `EmptyPaletteMark` are all legible across `SORT`, `Newest`, `Most Popular`,
`Most Forked`. Measured surface: `background-color: oklab(0.936408 0.005529 0.013284 / 0.808)`,
`backdrop-filter: blur(11px) saturate(1.6)` (`p4-1.json`). At 0.808 alpha and an 11px blur, 40px
display type behind the menu survives legibly.

`p4-popover-full-tall.png` also shows the menu's **own ground changing colour halfway down**: the
top half sits over the pane Card (warm cream), the bottom half hangs off the Card onto the pink
ambient field. The dark horizontal band across the middle of the frame is the Card's own bottom
edge, showing through the menu, **directly beneath the `TIER` group**.

### 2.4 The nested picker

`evidence-p4/p4-minipicker.png`

`MiniColorPicker` opens a **second `role="dialog"` inside the first** (`p4-6.json`
`dialogCount: 2`, `nested: true`), 208 × 218.7px, positioned `side="top" align="start"` so it lands
**on top of its own parent's Tier and Tags rows** — 218.7 / 468.1 = **46.7% of the parent menu is
eclipsed by its child**. Both surfaces are translucent, so the frame carries three superimposed
layers of text: the page, the parent menu (`Most Forked`, `TIER`, `Featured`, `FIND BY COLOR`,
the parent's own swatch and field), and the child.

The child's content is a **hard sRGB HSV square and a six-stop sRGB rainbow strip**
(`#f00→#ff0→#0f0→#0ff→#00f→#f0f→#f00`, `MiniColorPicker.vue:31`). In a product whose
constitution opens "value.js is a chromatic laboratory, not a dashboard" and whose signature is
"a continuous liquid-color rail" (`VISUAL-CONSTITUTION.md:5,7`), this 174×112 rectangle is the most
saturated object in the entire application and the only place that speaks sRGB-HSV.

The child also carries its **own `Search` button** (52.6 × 36) forty pixels from the parent's
`Search` button (52.6 × 24) — both visible in the same frame, same name, same job, 12px different
heights.

---

## 3. BLOCKERS

### P4-B1 · BLOCKER · **The Tags filter cannot work.** It speaks an API glass-ui 7 does not have.

`SearchFilterBar.vue:51-55`

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

`demo/ui/checkbox/index.ts` is `export { Checkbox } from "@mkbabb/glass-ui";`. The producer's
typings, `node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts:4-12,19`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;  value?: SelectionValue;  id?: string;  class?: …;
}
…  "update:modelValue": (value: CheckedState) => any;
```

There is no `checked` prop and no `update:checked` emit. Therefore `toggleTag` is **never called**
and `selectedTags` never changes.

**Reproduction — three activation paths, `probe-P4-3.mjs`, WebKit, `evidence-p4/p4-3.json`:**

| action | producer `aria-checked` | app's `activeFilterCount` badge |
|---|---|---|
| baseline | 12 × `false` | absent |
| click the row `<label>` "pastel" | `[true, false × 11]` | **absent** |
| click the checkbox button directly | `[false × 12]` (toggles back) | **absent** |
| keyboard `Space` on checkbox #2 | `[false, true, false × 10]` | **absent** |

The producer's uncontrolled checkbox flips its own visual state; the application's model never
moves; the wall is never filtered. **The UI shows a selection the product does not hold.**

The rendered DOM carries the wreckage of the failed prop, and it is self-contradictory:

```html
<button data-slot="checkbox" class="checkbox control-surface glass-control-edge focus-ring tap-squish shrink-0"
        checked="false" role="checkbox" type="button" aria-checked="false" …>
```

`checked="false"` is the unrecognised prop landing as a literal DOM attribute on a `<button>`
(non-conforming HTML), and after the first toggle it is a **stale mirror**: the node says
`checked="false"` while `aria-checked="true"`.

> **Why the gates did not hold.** Vue's fallthrough-attribute typing accepts both an unknown
> attribute and an unknown `on*` listener on a `DefineComponent`, so `vue-tsc` has nothing to
> reject. This class of break is invisible to the typecheck by construction, which is precisely
> why the producer-API surface needs a rendered witness, not a compile.

**Cure.** `<Checkbox :model-value="selectedTags.includes(tag.name)" @update:model-value="toggleTag(tag.name)" />`
— but see §12: the row should not be a `Checkbox` in a `<label>` at all.

---

### P4-B2 · BLOCKER · **The active-filter count renders as a gold crescent. There is no digit, and no other signal exists.**

`SearchFilterBar.vue:7-12` — a `<span>` at `absolute -right-1 -top-1` inside the trigger.

The producer's own button declares **`contain: paint`** (measured, both engines, `p4-7.json`:
`triggerContain: "paint"`, `triggerOverflow: "visible"`). `contain: paint` clips descendants to the
padding box. The badge is 16 × 16 offset −4/−4, so its outer 4px band is clipped; and because the
button is `border-radius: 9999px` on a 32 × 40 box — an **ellipse** — the surviving top-right
region is a crescent that does not contain the badge's centred glyph.

**Frame:** `evidence-p4/p4-adj-badge-chromium.png` (DPR 3, tier = Featured, count = 1). What
renders is a **gold sliver**. No digit.

| | |
|---|---|
| badge rect | 16 × 16 at `(661, 382.36)`, right `677`, top `382.36` |
| trigger rect | 32 × 40 at `(641, 386.36)`, right `673`, top `386.36` |
| clipped band | 4px on the top edge, 4px on the inline-end edge → **≥ 43.75%** of the badge area removed before the elliptical corner is considered |
| cross-engine | identical in WebKit (`660.67/381.98`) and Chromium (`661/382.36`) |

This is the **only** signal that filters are active:

- `aria-label="Filters"` on the trigger **overrides** the badge subtree, so the count is absent
  from the accessible name (`p4-2.json` `triggerAccNameIncludesCount: false`);
- `liveRegions: []` — no status region announces a filter change (`p4-5.json`, six trials);
- the results wall renders no filter chips (`BrowsePane.vue:80-118`).

So a user with three filters applied and a user with none see the same crescent, hear the same
name, and get the same wall — except one wall is filtered.

**I record that my own first reading was wrong.** `probe-P4-2.mjs` walked the ancestor chain for
`overflow` / `clip-path` / `mask-image` and concluded "not clipped". `contain` was not in the walk.
Pass 3's `P3-B3` is **CONFIRMED**; pass 1's negative and my own first negative are **withdrawn**.

**Cure.** A count does not belong in the producer's contained button. Move the truth to where the
user is looking: a named filter summary beside the field (`Featured · 3 tags`, each removable), and
make the trigger's accessible name carry the count.

---

### P4-B3 · BLOCKER · **The menu runs off the bottom of every viewport and cannot scroll.**

`PopoverContent class="w-60 p-0"` — no height contract. Measured (`p4-2.json`,
`max-height: none`, `overflow: visible`, `overflow-y: visible` in **all** arms):

| arm | viewport | popover | bottom | **below the fold** |
|---|---|---|---|---|
| desktop, 12 tags | 1440 × 900 | 240 × **632.63** | 1012.63 | **112.63px** |
| desktop, 12 tags + 1 filter (Clear-all row) | 1440 × 900 | 240 × **685.63** | 1065.63 | **165.63px** |
| mobile | 390 × 844 | 240 × 620.66 | 967.32 | **123.32px** |
| narrow | 320 × 568 | 240 × 619.84 | 862.84 | **294.84px** (47.6% of the menu) |
| 200% zoom | 1440 × 900 | 480 × **1265.5** | 1287.5 | **387.5px**, and `right = 1511 > 1440` |

The popover is portalled and fixed, so document scroll cannot reach it, and it has no scroller of
its own. What is below the fold is not decoration:

- the entire **`Find by Color`** section (`top 903.72`, the whole reason a colour library ships a
  colour filter);
- the entire **`Clear all filters`** row (`top 1000.28`) — the only escape from an applied filter.

The 200% arm additionally fails WCAG 1.4.4 on two axes at once (387.5px below and 71px past the
inline edge).

This is not a "long list" problem. The menu is 632.63px of which the two radio groups consume
**337.82px (53.4%)** to express **five** mutually-exclusive choices — see P4-B4.

**Cure.** The popover needs a height contract (`max-height` bounded by the viewport +
`overflow-y: auto` on the content, with the producer's fading-scroll affordance), and the body
needs to stop spending 337.82px on five radio buttons.

---

### P4-B4 · BLOCKER · **A form's rhythm was imported into a menu; the producer's touch-target solution was undone by inserting a `<label>`.**

This is the structural finding and it explains most of what is ugly in §2.3.

glass-ui already solves the problem `PROPORTION-AUDIT.md` PR-12 names ("touch padding bloats /
misaligns visual glyphs … invisible/seat geometry preserves target floor while optics follow
rung"). `node_modules/@mkbabb/glass-ui/dist/components/radio-group/styles.css`:

```css
.radio-group {
  --radio-face: 1.125rem;                                  /* 18px — the optics  */
  --radio-seat: var(--touch-target, 2.75rem);              /* 44px — the target  */
  --radio-seat-offset: calc((var(--radio-seat) - var(--radio-face)) / -2);   /* -13px */
  display: flex; flex-direction: column; align-items: flex-start;
  gap: calc(var(--radio-seat) - var(--radio-face));        /* 26px */
}
.radio-group__item { inline-size: var(--radio-seat); block-size: var(--radio-seat);
                     margin: var(--radio-seat-offset); }
```

Confirmed live (`p4-5.json`): `--radio-seat: 2.75rem`, `--radio-face: 1.125rem`, item rect
`44 × 44`, item `margin: -13px`, group `gap: 26px`, group `align-items: flex-start`. The producer's
arithmetic: an 18px face + a 26px gap = a **44px pitch that equals the 44px seat**. Optics follow
the rung; the target floor is met invisibly. It is exactly right.

`SearchFilterBar.vue:22-26` inserts a `<label class="filter-option">` between the group and the
item. The negative margin still collapses the item, but the **gap now separates 30.94px text rows
instead of 18px circles**. Measured (`p4-2.json`):

| list | row height | pitch | dead space | source of the rhythm |
|---|---|---|---|---|
| Sort (3 radios) | 30.94 | **56.93** | 26.00px = **45.7%** | producer `gap: calc(44px − 18px)` |
| Tier (2 radios) | 30.94 | **56.93** | 26.00px = **45.7%** | same |
| Tags (12 checkboxes) | 30.94 | **32.94** | 2.00px = 6.1% | consumer's own `flex flex-col gap-0.5` |

`56.93 / 32.94 = **1.73×**`. **One 240px menu, two rhythms.** It is plainly visible in
`p4-popover-full-tall.png`: `Newest` / `Most Popular` / `Most Forked` float apart while
`pastel` / `neon` / `earth` are packed.

The proximity is also **inverted**. The section label sits 6px above its first option
(`.section-label { margin-bottom: 0.375rem }`, `SearchFilterBar.vue:239`) while sibling options sit
26px apart — so each option is **4.33× closer to its heading than to its own siblings**. Gestalt
proximity therefore groups `SORT`+`Newest` and orphans `Most Popular` and `Most Forked`.

The same producer property breaks the hit area. `align-items: flex-start` is right for bare
circles and wrong for menu rows; the `<label>` shrinks to content (`p4-3.json`):

| row | label width | fills the 182px column? |
|---|---|---|
| Newest | 121.42 | no |
| Most Popular | **165.44** | no |
| Most Forked | 159.69 | no |
| All | **61.14** | no |
| Featured | 132.92 | no |
| every tag row | 182.00 | yes |

`165.44 / 61.14 = **2.71×**`. `.filter-option:hover` paints a rounded fill on that box, so the
hover highlight is a **different width on every row** in the top two sections and a constant width
in the third — visible in `p4-popover-full-tall.png`, where the hovered `All` pill stops a third of
the way across the menu. And the *click* target for `All` is 61.14 × 30.94 in a 240px menu: a user
aiming at the right half of the `All` row hits nothing.

**Cure (architectural, not a patch).** These are menu rows, not a form. The design-system answer
already exists and is already re-exported in this repo: `DropdownMenuRadioItem` /
`DropdownMenuCheckboxItem` own full-bleed rows, an indicator gutter, roving focus, typeahead and a
producer-owned selected register. Adopt the producer's menu primitives and delete the local
`.filter-option` recipe, the interposed `<label>`, and both `RadioGroup`s.

---

### P4-B5 · BLOCKER · **"Search by CSS color" accepts one syntax out of the whole CSS colour grammar, advertises another, and reports nothing.**

`SearchFilterBar.vue:218`

```ts
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

Everything that is not exactly `#RRGGBB` silently becomes the swatch's colour. Meanwhile the same
component advertises otherwise, twice:

- `aria-label="Search by CSS color"` (line 93)
- `placeholder="#hex, hsl(...)"` (line 92)

…and imports the product's own universal parser three lines above the regex
(`import { parseColorIn } from "../../../color-session/color-utils"`, line 145), which it then uses
*only after* the regex has thrown the input away (line 206).

**Reproduction — `probe-P4-5.mjs`, WebKit, six syntaxes, `evidence-p4/p4-5.json`:**

| typed | valid CSS? | searched | `aria-invalid` | error text | live region | page error |
|---|---|---|---|---|---|---|
| `rebeccapurple` | yes | `#4488cc` | `null` | none | none | none |
| `hsl(200 80% 50%)` | yes — **the placeholder's own example** | `#4488cc` | `null` | none | none | none |
| `oklch(0.72 0.14 244)` | yes — **the product's canonical space** | `#4488cc` | `null` | none | none | none |
| `#f00` | yes | `#4488cc` | `null` | none | none | none |
| `not-a-color` | **no** | `#4488cc` | `null` | none | none | none |
| `#4488CC` | yes — the one accepted form | `#4488cc` | `null` | none | none | none |

All six produce **byte-identical** feedback. Garbage and a valid `oklch()` are indistinguishable to
the user; so is the one case that actually worked.

This is the sharpest instance of the general defect in this component: **the surface asserts a
capability the product does not have.** And here the product *does* have it — `parseColorIn` is
already in the file. The library under audit is a CSS colour parser; its own flagship demo disables
it behind a six-digit-hex guard and then names the field after the thing it refuses to do.

**Cure.** Delete the regex. `parseColorIn(text, "oklab")` in a `try`/`catch`; on failure set
`aria-invalid` and render the producer's field-error affordance; on success mirror the parsed
colour into the swatch so the instrument shows what it understood.

---

## 4. MAJOR

### P4-M1 · MAJOR · The pending state is structurally unreachable, and so is every `disabled:` style attached to it.

`SearchFilterBar.vue:213-225`: `applyColorSearch` is `async`, sets `searching.value = true`, then
runs a **fully synchronous** body (`trim`, a regex, `parseColorIn`, `emit`) inside `try`, and
`finally` sets it back to `false`. No `await` ever yields, so Vue never flushes a render with
`searching === true`.

**Reproduction — `probe-P4-4.mjs`, both engines, rAF sampling + a `MutationObserver` over the
button subtree across 700ms after a real click:**

| engine | frames sampled | mutations observed | `<Loader2>` ever in the DOM | `disabled` ever true |
|---|---|---|---|---|
| WebKit | 68 | **0** | **false** | **false** |
| Chromium | 84 | **0** | **false** | **false** |

Dead by construction: the `Loader2` + `animate-spin` branch (line 102) and all the `disabled:`
utilities (line 99, `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`).

It could not be otherwise: `onColorSearch` in `BrowsePane.vue:351-355` filters
**already-loaded** rows client-side and issues no request — the comment says so
("API also supports server-side … but client-side is instant"). There is nothing to wait for. The
component ships a designed loading state for an operation that has no latency, and ships no state
at all for the operation that does (the 50-row page it is silently filtering).

### P4-M2 · MAJOR · The producer's `variant` API is dead; the two quietest controls ship at default emphasis.

`variant="ghost"` on the trigger (line 5) and on `Clear all filters` (line 112). Measured rendered
attributes, **identical in WebKit and Chromium** (`p4-7.json`):

```
data-slot=button  data-emphasis=secondary  data-tone=neutral  data-size=md
data-icon-only=true  type=button  …  variant=ghost   ← a raw DOM attribute, not a prop
```

`variant` lands as an inert HTML attribute while the producer paints `data-emphasis="secondary"` —
its **default**. The consequence is visible in `p4-popover-full-tall.png`: `Clear all filters`, a
terminal escape hatch, is the loudest object in the menu. Convergent with pass 3's `P3-M10`,
independently derived.

The same measurement shows the sizing failure: `data-size="md"` (min-height 40px) versus the
consumer's `h-8 w-8`. `min-height` beats `height`, so the height override is discarded (computed
`height: 40px`, `min-height: 40px`) while `w-8` succeeds — **breaking `data-icon-only`'s square
contract** and producing the 32 × 40 ellipse of §2.2. The identical mechanism hits
`Clear all filters`: declared `h-7` (28px), rendered `36px` (`p4-2.json`).

And `p-0` on `PopoverContent` (line 16) is likewise defeated: computed padding
`20.351999px 16px`. Three per-instance overrides, three defeats — owner edict 5 ("style at the
root component level, never per-instance overrides") is being violated *and* punished.

### P4-M3 · MAJOR · The colour field cannot render its own placeholder, let alone a colour.

Measured (`p4-2.json`, `placeholderFits`, computed from the live font):

| | px |
|---|---|
| input `clientWidth` | 145 |
| `padding-left` / `padding-right` (`pr-16`) | 16 / **64** |
| **usable text width** | **65** |
| `#hex, hsl(...)` needs | **123.94** → truncated to **52.4%** |
| `oklch(0.72 0.14 244)` needs | **177.05** → **2.72×** the space |

It renders as `#hex, …` — visible in `p4-webkit-light-open-crop.png` and
`p4-popover-full-tall.png`. The budget: a 240px popover minus 2×16 producer padding minus 2×12
section padding = 184px; a 28px swatch + 6px gap take 34; `pr-16` reserves 64px for a 52.59px
overlay button. **44% of the field is reserved for the word "Search" and 45% for the colour.** A
field whose entire job is to hold a CSS colour string holds eight characters.

### P4-M4 · MAJOR · Two boundary systems for one grouping, and the register says zero.

`class="divide-y divide-border"` (line 17) renders **3 hairlines** with 12 tags (4 with the
Clear-all row): measured `border-bottom: 1px rgb(198, 180, 159)` on the `Sort`, `Tier` and `Tags`
sections (`p4-2.json` — note `border-top` is `0px`; the divider is on the trailing edge).

- `PROPORTION-AUDIT.md:49` PR-05 — *"Dividers, caster shadows and corner marks repeat a boundary —
  **REMOVE** … every other divider/ornament is zero."*
- `VISUAL-CONSTITUTION.md:92` — *"Consumer CSS may not hide a producer divider … every other
  composition retains no divider."*
- `PROPORTION-AUDIT.md:69` §5.4 — *"A divider is retained only when grouping would be ambiguous
  without it. Spacing plus material already expressing the same boundary makes the line
  duplicative."*

Each section already carries a mono uppercase tracked label and 12px of padding. The line is the
third encoding of one boundary. It is also, at full-strength `--border`, the heaviest ink in the
menu.

### P4-M5 · MAJOR · The tag list is a fractional window that is not keyboard-operable and has no name.

`max-h-28 overflow-y-auto scrollbar-thin` (line 49). Measured (`p4-2.json`):

```
maxHeight 112px · clientHeight 112 · scrollHeight 400 · scrollable true
tabIndex -1 · role null · aria-label null · 12 tags
```

- 112 / 32.94 = **3.4 rows visible of 12** — a deliberately fractional cut.
  `p4-popover-full-tall.png` shows `monochrome` sliced through its x-height with a full-strength
  divider immediately below; the half-glyph reads as a rendering fault, not as an affordance.
- No fade, no scroll shadow, no count. The app owns `pane-scroll-fade` and glass-ui ships
  `fading-scroll`; neither is used.
- `tabIndex: -1` on a scrollable region: WCAG 2.1.1 requires keyboard operability of a scroll
  container. It has no `role`, no `aria-label`, and the twelve rows sit inside no named group.
- There is no way to find a tag among many — no filter, no ordering statement, no "12 tags".

### P4-M6 · MAJOR · In WebKit, `Tab` reaches 3 of 17 controls and then leaves the open dialog.

`probe-P4-4.mjs`, 22 consecutive `Tab` presses from the freshly-opened menu:

| engine | traversal | left the dialog at | tags / swatch / Search reached |
|---|---|---|---|
| **WebKit** | radio → radio → `input` → **out** | press **4** | **no / no / no** |
| Chromium | radio → radio → 12 × checkbox → swatch → input → Search → **cycles** | never (trapped) | yes |

In WebKit — the engine the entire shipped visual matrix was captured in, and the engine this
product's iOS users run — the **whole Tags section and the whole Find-by-Color instrument are
unreachable by `Tab`**, and focus escapes the `role="dialog"` on the fourth press. Chromium traps
correctly and cycles at index 17.

I have not isolated the WebKit mechanism (the radios *are* reached, so it is not the plain
"buttons are not tabbable" default), and I label that part a **hypothesis**. The measurement
itself is reproducible and cross-engine-divergent, and the design conclusion does not depend on the
mechanism: a 17-control menu built from bare producer primitives has no traversal contract of its
own, and it behaves differently in the two engines the product ships to.

### P4-M7 · MAJOR · Every option is nameless to assistive technology; both groups are nameless too.

Measured (`p4-2.json`, `p4-1.json`):

```
5 × [role=radio]      accessible name: null
12 × [role=checkbox]  accessible name: null
2 × [role=radiogroup] aria-label: null, aria-labelledby: null
```

Mechanism: `<label class="filter-option">` wraps a producer `<button role="radio">`. Per HTML-AAM
a `<button>`'s accessible name comes from its **subtree contents** (empty here), then `title` — the
wrapping `<label>` is not consulted, and it carries no `for` in any case. The visible text lives in
a sibling `<span>`, invisible to the name computation.

So the menu announces "radio button, not checked" five times and "checkbox, not checked" twelve
times, inside two groups that announce no purpose. `VISUAL-CONSTITUTION.md:83` — *"Selected,
failed, pending, withdrawn and disabled states are never color-only. Role, **accessible name**,
state/value … are explicit."*

The four lucide glyphs (`Clock`, `TrendingUp`, `GitFork`, `Award`) are decoration on rows that have
no name at all — `PROPORTION-AUDIT.md:70` §5.5: *"A small icon/mark is either data, status, labeled
action, drag affordance, focus/selection register or removed."*

### P4-M8 · MAJOR · In RTL the count chip flips into the field's text area.

`-right-1 -top-1` (line 9) is physical. Measured under `dir="rtl"` (`p4-3.json`):

```
dir rtl · trigger 767.5→799.5 · badge 787.5→803.5 · field 754→1216
badgeOutsideTriggerInlineEnd: false     badgeOverlapsFieldInterior: true
```

In RTL the inline-end is the **left**; the badge stays on the physical right, i.e. the inline-start
side, which is now the **interior of the search field**. `VISUAL-CONSTITUTION.md:150` §6.1 —
*"chrome, navigation and layout — logical inline/block direction follows the document."* The fix is
one token (`-inset-inline-end-1`), but the defect is that no state in this component was ever
authored against a direction.

### P4-M9 · MAJOR · Everything the producer owns adapts to forced colors; everything hand-rolled here does not.

`probe-P4-2.mjs` (`forcedColors: "active"`, WebKit) + frame `evidence-p4/p4-forced-open-crop.png`:

| element | owner | forced-colors behaviour |
|---|---|---|
| popover surface | producer | → `rgb(255,255,255)` / border `rgb(0,0,0)` ✔ |
| radio face + checked + focus | producer (`@media (forced-colors: active)` block in `radio-group/styles.css`) | → `ButtonText` / `Highlight` / 2px `Highlight` outline ✔ |
| **section dividers** | consumer `divide-border` | stays `1px rgb(198, 180, 159)` ✘ |
| **row hover** | consumer `color-mix(in srgb, var(--accent) 50%, transparent)` | resolves to `color(srgb 0.874 0.8254 0.766 / 0.5)` — an author colour ✘ |
| **colour swatch** | consumer inline `background-color` | WebKit keeps `rgb(68,136,204)`; pass 3 measured Chromium forcing it to `rgb(255,255,255)` ✘ either way |
| **inline `Search`** | consumer `bg-muted/50` + `text-muted-foreground` | stays author beige/brown ✘ |

Two consequences. (1) The one **data-bearing** colour in the component — the swatch, which *is* the
value — carries no `forced-color-adjust: none`, so whether the user's chosen colour survives is
engine-dependent. (2) The row hover is the **only** hover cue in the menu and it is an author
colour, so in forced colors the option rows lose all pointer feedback while the forbidden dividers
are the only boundary that survives.

---

## 5. MINOR / INFO

### P4-m1 · MINOR · The type roles are outside the constitution's closed matrix, in three places.

`VISUAL-CONSTITUTION.md:68-78` §4 is a **closed** matrix: display / `--type-title` /
`--type-subheading` / `text-heading` / `text-prose` / `text-small` / `text-mono-small`|`mono-caption`.

| element | rendered | matrix role | verdict |
|---|---|---|---|
| `.section-label` ("SORT"/"TIER"/"TAGS"/"FIND BY COLOR") | Fira Code 14.384px, `uppercase`, `letter-spacing 1.4384px` (glass-ui `.section-label` = `@apply text-mono-caption`) | section heading = `text-heading`, Plus Jakarta Sans | **mono used as a heading**; the mono role is "value, code, or provenance" |
| badge digit, inline `Search` label | `text-micro` → **11px** | *not in the matrix at all* | out of register |
| `MiniColorPicker` hex readout | `text-caption` | *not in the matrix* | out of register |

`.section-label` is a 12-site repo idiom, so this is a **family** row, not a local one — but the
family is out of register and this component is one of its sites.

### P4-m2 · MINOR · The control type recipe is hand-rolled instead of consumed.

`SearchFilterBar.vue:240-247` re-implements the control role by hand:

```css
.filter-option { font-family: var(--font-serif); font-size: var(--type-small);
                 line-height: var(--leading-small); border-radius: var(--radius-md); }
```

All three tokens resolve (`p4-1.json`: `--font-serif` → `"Plus Jakarta Sans"…`, `--type-small` →
`clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` = 16.4px at 1440, `--leading-small` → `1.4`) — the
recipe is *correct*, and it is exactly the `text-small` utility the producer already ships. Writing
it out by hand means the next producer change to the small rung silently skips this menu.

The `--font-serif` spelling is a legibility trap of its own: in a repo where "serif" means Fraunces
and Fraunces is *forbidden* for control copy (`foundation.css:95-102`), the token that says `serif`
resolves to Plus Jakarta Sans through a glass-ui bridge. The declaration reads as a violation and
is not one.

### P4-m3 · MINOR · Magic numbers where the spacing system has tokens.

`padding: 0.75rem`, `margin-bottom: 0.375rem` (lines 238-239), `max-h-28`, `gap-1.5`, `gap-0.5`,
`w-60`, `pr-16`, `h-7`, `h-6`, `h-3`, `h-3.5`, `-right-1`, `right-1`. `VISUAL-CONSTITUTION.md:33`
§3.7 — *"Spacing is container-scaled from glass-ui tokens."* `max-h-28` in particular is the number
that cuts a row in half (§P4-M5).

### P4-m4 · MINOR · The wrapper, the `type`, and the split ownership.

- `SearchFilterBar.vue:2` — `<div class="flex items-center gap-1.5">` wraps **one** child. A flex
  container with a gap and no siblings. Owner edict 3 (KISS, no contrivance).
- Line 97 — the inline `Search` `<button>` has **no `type`**, so it defaults to `submit`; the
  swatch twenty lines above correctly declares `type="button"`. Harmless today (no ancestor form),
  wrong by construction, and inconsistent within one section.
- Lines 171/193 — `colorSearchActive` is **component-local** while `colorSearchParams` lives in
  `BrowsePane.vue:336`. `activeFilterCount` therefore mixes parent-owned truth (`tier`,
  `selectedTags`) with a child-local shadow. Any parent-side clear of the colour search leaves the
  badge lit. One filter model, two owners.

### P4-i1 · INFO · Dead defensive branch.

`hexToOklab` (lines 205-211) throws `"Hex color produced missing OKLab channels"`. Its only caller
guarantees a 6-digit hex, and `parseColorIn` on an opaque hex cannot yield `"none"` channels — so
the branch is unreachable. Owner edict 2 (no masking fallbacks); this is its mirror image, an
unreachable guard.

### P4-i2 · INFO · What the component does right, recorded so it is not "fixed".

- `const { sort, tier, selectedTags, availableTags } = defineProps<…>()` — reactive props
  destructure, the Vue 3.5 idiom (edict 7). ✔
- `import type { Tag }` — `verbatimModuleSyntax` honoured (edict 8). ✔
- `MiniColorPicker.vue` uses `useTemplateRef` (edict 7). ✔
- The static SV gradient lives in scoped CSS with only the dynamic hue in `:style`
  (`MiniColorPicker.vue:150-155`) — the right split. ✔

---

## 6. State coverage — the full enumeration

A state that was never designed is a design defect. Measured row by row.

| state | designed? | measured truth |
|---|---|---|
| **closed / rest** | partly | trigger 32 × 40 in a 36px field; 2.00px proud top **and** bottom; fill identical to host (`p4-1.json`) |
| **closed / filters active** | **BROKEN** | gold crescent, no digit, `contain: paint` (`p4-adj-badge-chromium.png`) |
| **open / empty tag catalogue** | untreated | section `v-if`'d away; identical pixels to "the tag fetch failed" |
| **open / tag catalogue failed** | **absent** | no error arm exists; renders as absence |
| **open / populated** | **BROKEN** | 632.63px tall, 112.63px below the fold, no scroller (`p4-2.json`) |
| **loading (colour search)** | **UNREACHABLE** | 0 mutations / 68 + 84 frames (`p4-4.json`) |
| **loading (tag catalogue)** | absent | no skeleton, no pending affordance |
| **error (invalid colour)** | **ABSENT** | 6/6 syntaxes → silent fallback, no `aria-invalid`, no text, no live region (`p4-5.json`) |
| **error (browse wall unreachable)** | ignored | filter chrome fully enabled over the error arm (shipped Safari capture) |
| **disabled** | declared, unreachable | the `disabled:` utilities hang off a state that never paints |
| **focused** | **4 vocabularies** | radios/checkboxes/input: producer `--focus-ring-shadow`; swatch: local `.focus-ring`; inline `Search`: **UA default `outline: auto 1px`** (`p4-4.json` chromium idx 16) |
| **hovered** | ragged | pill widths 61.14 → 182.00 in one menu, **2.71×** (`p4-3.json`) |
| **active / pressed** | partial | producer `tap-squish` on producer controls; the hand-rolled `Search` has none |
| **selected** | **BROKEN for tags** | `aria-checked` flips, model never moves (`p4-3.json`) |
| **dragging** | n/a | no drag surface |
| **overflowing** | **BROKEN** | 112.63 / 123.32 / 294.84 / 387.5px below the fold at 1440 / 390 / 320 / zoom-200 |
| **truncated** | **BROKEN** | placeholder cut to 52.4%; a real value needs 2.72× the width |
| **RTL** | **BROKEN** | badge inside the field interior; trigger still 2px proud (`p4-3.json`) |
| **reduced motion** | ✔ producer | `animation-duration: 0.00001s`, `iteration-count: 1` on `.animate-spin`; popover animation likewise (`p4-2.json`) |
| **forced colors** | **partial** | producer parts adapt; dividers, hover, swatch, inline `Search` do not (§P4-M9) |
| **zoom 200%** | **BROKEN** | 480 × 1265.5; `right 1511 > 1440`; 387.5px below the fold |

---

## 7. Motion

Tokenised and compliant, and I say so plainly:

- `.filter-option` transition resolves to `background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)` —
  `--duration-fast` / `--ease-standard`, house tokens (`p4-1.json`).
- The bare `transition-colors duration-fast` on the inline `Search` button resolves to `0.2s` with
  the same easing, because `foundation.css:120-127` aliases Tailwind's untokened default to the
  house tokens at the `@theme` root. Good architecture doing its job.
- Only `background-color` / `color` animate. Nothing here forces layout.
- `prefers-reduced-motion: reduce` → `animation-duration: 0.00001s`, `iteration-count: 1`
  (`p4-2.json`). The producer's global guard reaches Tailwind's `animate-spin`.

**The one motion defect is not in the motion — it is that motion was chosen to carry a state.**
`Loader2 + animate-spin` is the *only* expression of `searching`, and under `reduce` a spinner
resolves to a static glyph indistinguishable from an icon. Had the state ever painted (P4-M1), a
reduced-motion user would have had no way to tell searching from idle. `VISUAL-CONSTITUTION.md:144`
— *"Reduced motion resolves directly to the final geometry and stable chromatic state."*

---

## 8. The design-system boundary

| what the component hand-rolls | what glass-ui 7 / `demo/ui/` already ships |
|---|---|
| `.filter-option` — a menu row recipe (font, size, leading, radius, padding, hover fill) | `DropdownMenuRadioItem` / `DropdownMenuCheckboxItem`, full-bleed, indicator gutter, roving focus, typeahead |
| the count `<span>` (absolute, `bg-primary`, `text-micro`, `rounded-full`) | `Badge` |
| the inline `Search` overlay button (absolute, `bg-muted/50`, hand-built disabled + spinner) | `Button` with the producer's own loading affordance |
| `MiniColorPicker` — a complete second colour picker (HSV maths, SV plane, hue rail, hex readout) | the product's **own** colour picker occupies route `/`; `parseColorIn` is already imported into this very file |
| the `divide-y` boundary system | the register says the boundary count is **zero** |
| four focus vocabularies | one producer focus register |

Three per-instance overrides are attempted and all three are defeated by the producer (`variant`,
`h-8`/`h-7`, `p-0` — §P4-M2). That is the shape of edict 5 being violated: the component keeps
reaching past the root to tune an instance, and the root keeps winning, and the residue is a
32 × 40 ellipse in a 36px field.

`MiniColorPicker` deserves its own line. Owner edict 3 forbids wrapper components that do not
already exist; edict 4 puts variants in glass-ui. This is neither — it is a **second design system
for colour selection**, ~160 lines of sRGB-HSV arithmetic, inside a repository whose entire thesis
is perceptual colour, reachable only through this component, with a `role="dialog"` nested inside
another `role="dialog"`, its SV plane a bare `<div>` with `role: null`, `tabIndex: -1`,
`aria-label: null`, no `aria-valuenow`, no `aria-valuetext`, and **exactly one focusable descendant
in the whole picker** (`p4-6.json`). `VISUAL-CONSTITUTION.md:125` §5.2 is explicit and this fails
it verbatim: *"Spectrum coordinates — expose two named numeric axes using the same Slider law;
**pointer canvas is not the sole keyboard control**."*

---

## 9. Judgement against the tranche canon

| authority | clause | verdict |
|---|---|---|
| `PROPORTION-AUDIT.md:49` PR-05 | dividers **REMOVE**, count zero | **FAIL** — 3 rendered (4 with Clear-all) |
| `PROPORTION-AUDIT.md:51` PR-07 | *"every surviving action/drag seat has a name/state"* | **FAIL** — 17 unnamed controls, 2 unnamed groups |
| `PROPORTION-AUDIT.md:52` PR-08 | *"Pending/failure/export/recovery truth only transient — **ADD-AFFORDANCE**"* | **FAIL** — pending unreachable, failure absent |
| `PROPORTION-AUDIT.md:56` PR-12 | *"Touch padding bloats/misaligns visual glyphs — TIGHTEN"* | **FAIL** — and worse: the producer had already fixed it, and the `<label>` undid the fix |
| `PROPORTION-AUDIT.md:70` §5.5 | icons are data / status / labeled action / focus register or removed | **FAIL** — 4 decorative glyphs on nameless rows |
| `PROPORTION-AUDIT.md:71` §5.6 | *"Subtraction precedes explanation."* | **FAIL** — 337.82px (53.4%) of the menu for 5 exclusive choices |
| `PROPORTION-AUDIT.md:73` §5.8 | *"Real rendered relation wins over token intent."* | **FAIL** — `variant`, `h-8`, `h-7`, `p-0` all declared, none rendered |
| `VISUAL-CONSTITUTION.md:21` §2 | *"Seed tint is forbidden outside the ambient field, active accent, WatercolorDot/specimen, and pastel Palettes lanes."* | **FAIL** — `#4488cc` is a hard-coded sRGB blue and the loudest object in the menu; the app's live `cssColorOpaque` is injected into `BrowsePane` and ignored here |
| `VISUAL-CONSTITUTION.md:68-78` §4 | closed type matrix | **FAIL** — mono-as-heading, `text-micro`, `text-caption` |
| `VISUAL-CONSTITUTION.md:82` §4.1 | *"Text, focus, boundaries and state meet their rendered contrast **on the actual material tier**; a token name is not evidence."* | **FAIL** — 0.808 alpha over a two-ground seam (§2.3) |
| `VISUAL-CONSTITUTION.md:83` §4.1 | states are never colour-only; role + **accessible name** + state explicit | **FAIL** — §P4-M7 |
| `VISUAL-CONSTITUTION.md:92` §4.2 | divider inventory `[]` | **FAIL** |
| `VISUAL-CONSTITUTION.md:99` §5 | *"every spatial action has a keyboard/numeric equivalent"* | **FAIL** — the SV plane and hue rail are pointer-only |
| `VISUAL-CONSTITUTION.md:115` §5.1 | Popover close returns focus to *"the exact connected opener"* | **PASS** — see §10 |
| `VISUAL-CONSTITUTION.md:125` §5.2 | *"pointer canvas is not the sole keyboard control"* | **FAIL** |
| `VISUAL-CONSTITUTION.md:144` §6 | reduced motion resolves to the final state | **PASS** for the mechanism, **FAIL** for the choice (§7) |
| `VISUAL-CONSTITUTION.md:150` §6.1 | logical inline/block direction follows the document | **FAIL** — §P4-M8 |
| `VISUAL-CONSTITUTION.md:186` §7 | *"Search/filter chrome is one family."* | **FAIL** — two option rhythms (1.73×), two box models, four focus vocabularies, two `Search` buttons |

`PALETTE-CONTRACT.md` bears on this component only through `§1 GET /palettes` ("cursor **or**
offset; sort newest / popular / most-forked; **color-distance filter**; visibility-filtered"). The
contract puts the colour-distance filter on the wire; `BrowsePane.vue:339-355` implements it
client-side over the ≤50 already-loaded rows and says so in a comment. So this component's colour
filter searches a page, not the commons — a scope the UI never states.

---

## 10. Negative proofs — five axes I attacked and could not break

Recorded so the next pass does not re-spend the budget, and so my own errors are on the record.

1. **The radios DO paint a focus register.** `probe-P4-7-adjudicate.mjs`, Chromium, a real keyboard
   `Tab` and a real `ArrowDown`: `matchesFocusVisible: true`, and on the **`.radio-group__face`**
   child — `box-shadow: color(srgb 0.665504 …/0.3) 0 0 0 2px, color(srgb … /0.15) 0 0 8px 0`,
   `faceHasRing: true`. The producer recipe is
   `.radio-group__item:focus-visible .radio-group__face { box-shadow: var(--focus-ring-shadow) }`
   (`radio-group/styles.css`). Measuring `getComputedStyle(document.activeElement)` returns the
   *item*, whose own shadow is legitimately `none`, and manufactures a false negative.
   → **Pass 3's `P3-M14` is OVERTURNED, and my own probe-4 reading of the same thing is
   withdrawn.**
2. **`Escape` DOES restore focus to the trigger.** `probe-P4-4.mjs`, both engines, measured
   immediately after open: `focusAfterEscape.isTrigger: true`, popover closed. My first
   measurement said otherwise because the harness had already tabbed focus out of the dialog before
   pressing Escape. Withdrawn. (Pass 3's separate `P3-M9` concerns **click-outside**, a different
   path I did not probe.)
3. **`--leading-small` is not a dead token.** I hypothesised that `@theme inline` in
   `glass-ui/dist/styles/theme/bridges.css` would suppress the runtime custom property. Measured on
   a live element: `--leading-small: 1.4`, `--font-serif: "Plus Jakarta Sans"…`. The
   `.filter-option` recipe resolves correctly. Withdrawn (it survives only as the much weaker
   P4-m2).
4. **The count badge does not overflow at two digits.** Forced the span's content to `"13"` and
   measured: `scrollWidth 16` = `clientWidth 16`, `overflows: false`. Withdrawn. (It is moot — the
   digit never renders at all, §P4-B2.)
5. **Opening `MiniColorPicker` does not clobber typed input.** Typed `oklch(0.72 0.14 244)`, opened
   the picker, measured: `clobberedOnOpen: false`. `watch(currentHex, …)` is not `immediate`, and
   the mount-time round-trip of `#4488cc` reproduces the same hex, so no `update:hex` fires.
   Withdrawn.

Two further honest limits: the **WebKit tab mechanism** in §P4-M6 is measured but unexplained and
is labelled a hypothesis; and my WebKit forced-colors read of the swatch disagrees with pass 3's
Chromium read — I report both, because the design conclusion (no `forced-color-adjust` declaration
on the one data-bearing colour) holds either way.

---

## 11. Convergence with the prior passes

| this pass | prior | relation |
|---|---|---|
| P4-B1 (Tags dead) | D-1 · D2-B1 · P3-B1 | **4-way convergence.** New here: the three-path activation table proving the producer's `aria-checked` and the app's model disagree, and the self-contradictory `checked="false"` / `aria-checked="true"` node |
| P4-B2 (badge crescent) | P3-B3 | **CONFIRMED** by an independent mechanism read (`contain: paint`, both engines, DPR 3) + my own frame. My first negative and pass 1's negative both **withdrawn** |
| P4-B3 (overflow, no scroller) | D-2 · D2-B2 · P3-B2 | **Convergent + extended**: 5 arms including the Clear-all arm (165.63px) and the 200% inline overflow (`right 1511 > 1440`) |
| P4-B4 (form rhythm in a menu) | P3-M3 (proximity 4.33×), P3-M4 (rag) | **Extended into the mechanism.** New here: the producer's `--radio-seat`/`--radio-face`/`margin: −13px` arithmetic, the exact 56.93 = 30.94 + 26.00 identity, and the **1.73× two-rhythm measurement against the consumer's own tag list** — which required a populated catalogue |
| P4-B5 (colour syntax lie) | D-19 · D2-B4 · P3-B4 | **4-way convergence**, 6-case table re-run |
| P4-M1 (`searching` unreachable) | — | **NEW.** rAF + MutationObserver, both engines, 0 mutations |
| P4-M2 (`variant` dead) | P3-M10 | **CONFIRMED** cross-engine; extended with the `data-size=md` → `h-8` defeat and the `data-icon-only` square-contract break |
| P4-M3 (placeholder cannot fit) | — | **NEW.** 65px usable vs 123.94 / 177.05 needed |
| P4-M5 (tag scroller) | — | **NEW.** 3.4 of 12 rows, `tabIndex −1`, unnamed |
| P4-M6 (WebKit tab) | P3-M9 (click-outside) | **NEW and a different path** |
| P4-M8 (RTL badge) | — | **NEW.** measured under `dir=rtl` |
| P4-M4 · M7 · M9 · m1 | P3-M5 · P3-M8 · P3-M13 · — | convergent, independently measured |
| — | **P3-M14** | **OVERTURNED** (§10.1) |

---

## 12. The cure — one transposition, not eighteen patches

Twenty findings, three mechanisms. Patching them individually rebuilds the same object.

**1. The menu becomes a menu.** Delete `.filter-option`, the interposed `<label>`, and both
`RadioGroup`s. Adopt the producer's menu primitives (`DropdownMenuRadioItem` /
`DropdownMenuCheckboxItem`) which already own: full-bleed rows, one indicator gutter, one focus
register, roving focus, typeahead, and an accessible name taken from the row's own text. That
single move retires **P4-B1, P4-B4, P4-M4, P4-M5, P4-M7, P4-m1, P4-m2, P4-m3** and both of the
"four focus vocabularies" and "two box models" rows, because none of them are decisions the
consumer gets to make any more.

**2. The colour instrument becomes the product's colour instrument.** Delete `MiniColorPicker`.
The field takes any CSS colour through `parseColorIn` — which is already imported — with a real
invalid state; the swatch seeds from the injected live `cssColorOpaque` instead of `#4488cc`; the
colour section moves out of the 240px popover, where a 65px text field and a nested dialog were
never going to work, into the search bar beside the query. That retires **P4-B5, P4-M3, P4-M9's
swatch row**, the nested-dialog and pointer-only failures, and removes 46.7% of a menu eclipsing
itself.

**3. Filter truth becomes visible where the user is looking.** The count leaves the producer's
`contain: paint` button. Applied filters render as named, removable chips beside the field —
which is simultaneously the count, the `Clear all` affordance, the live-region announcement and the
accessible name. That retires **P4-B2, P4-M8, P4-m4's split-ownership row**, and — because the menu
no longer has to carry `Clear all filters` or a colour instrument — it is short enough that
**P4-B3** stops being a height problem and becomes a height *contract* (`max-height` +
`overflow-y: auto`) rather than a redesign.

What is left after those three moves is a menu with three short lists and no colour picker in it,
sitting under a 40 × 40 icon button that fits inside its field.

---

## 13. Evidence index

| artifact | what it proves |
|---|---|
| `probe-P4-1.mjs` → `evidence-p4/p4-1.json` | closed-state geometry, ancestry, token resolution, open-state computed styles (WebKit light/dark + Chromium) |
| `probe-P4-2.mjs` → `p4-2.json` | populated desktop, active state, badge, mobile 390 / 320, reduced motion, forced colors, tab order, zoom 200% |
| `probe-P4-3.mjs` → `p4-3.json` | **the Tags-are-dead three-path reproduction**, hover box geometry, RTL badge, 2-digit badge |
| `probe-P4-4.mjs` → `p4-4.json` | escape/focus law, 22-step tab traversal both engines, **`searching` never paints** |
| `probe-P4-5.mjs` → `p4-5.json` | radio face read, **six-syntax colour-input truth table** |
| `probe-P4-6.mjs` → `p4-6.json` | mini-picker nesting + AT surface, clobber negative, forced-colors swatch |
| `probe-P4-7-adjudicate.mjs` → `p4-7.json` | **`contain: paint`**, **`variant=ghost` inert**, **radio face ring confirmed** — the three adjudications |
| `evidence-p4/trigger-safari-desktop-{light,dark}.png`, `trigger-rtl.png` | 5× crops of the **shipped** Safari matrix — the lozenge breaking the field |
| `evidence-p4/p4-popover-full-tall.png` | the whole menu at once: two rhythms, ragged hover pill, sliced tag row, see-through ground seam, truncated placeholder |
| `evidence-p4/p4-webkit-light-open-crop.png` | the menu over the shipped error arm |
| `evidence-p4/p4-minipicker.png` | the nested dialog eclipsing its parent; the sRGB HSV square; the duplicated `Search` |
| `evidence-p4/p4-adj-badge-chromium.png` | **the gold crescent** |
| `evidence-p4/p4-forced-open-crop.png` | producer adapts / consumer does not |
| `dbg-p4.mjs` | the harness note: `localhost` cannot reach this component's real states |

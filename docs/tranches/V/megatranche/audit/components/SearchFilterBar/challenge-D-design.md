# CHALLENGE-D — `SearchFilterBar.vue` · the design is flawed — **PASS 2**

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context arm), as
declared at spawn. The seat is declared, not inherited.

---

## 0. Standing of this document

A prior CHALLENGE-D seat ran at this same HEAD and wrote an 814-line report. I did **not** read it
until my own probes had finished; it is preserved verbatim at
`challenge-D-design-pass1-c654824e.md`. This file is the **pass-2 report** and it does three
things:

1. **Independently re-derives** pass 1's headline findings from a different probe harness, a
   different API-stub mechanism, and a different set of viewports. Where two independent passes
   converge on the same measured number, the finding is no longer arguable.
2. **Adds seven findings pass 1 does not contain.**
3. **Overturns one pass-1 negative.** Pass 1 recorded, explicitly, that the active-filter badge is
   *not* clipped. It is. The clip is cross-engine, and I have the mechanism and the frames.

| | |
|---|---|
| Component | `demo/palettes/browser/search/SearchFilterBar.vue` (249 lines, area `palettes`) |
| Sole consumer | `demo/palettes/BrowsePane.vue:15-26`, slotted into glass-ui `SearchBar`'s default slot (`BrowsePane.vue:10,195`) |
| Route | `/#/browse` only |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| **Pass-2 verdict** | **DEFECTIVE.** 4 BLOCKER · 8 MAJOR · 5 MINOR. Two of the four BLOCKERs are surfaces that assert a state the product does not hold. |

**The gestalt, restated from pass 2's angle.** The component's architectural mistake is not merely
"hand-rolled instead of `DropdownMenu`". It is that **five consumer-authored API calls in this one
file are silently inert against glass-ui 7** — `variant="ghost"`, `:checked`, `@update:checked`,
`p-0`, and half of `h-8 w-8`. Every one is a pre-glass-7 (shadcn/radix-era) idiom that survived the
7.0.0 adoption as a no-op, because Vue fallthrough attributes fail *silently*. One of those inert
calls kills an entire filter section. The design defect and the legacy-code defect are the same
defect seen from two sides, and that is why a patch cannot fix it: you cannot patch a call that
was never wired.

---

## 1. What I ran, and how the numbers can be re-derived

The mega-tranche Safari matrix (`audit/visual/`) photographs `/#/browse` with the popover
**closed** in all four matrices — `REPORT.json` → `/#/browse` shows `smallTapTargets` from
`PaletteSlugBar` only ("Switch to slug", "Generate new slug", "Cancel") and `button: 14`. The
component's entire body — 107 of its 125 template lines — is **unphotographed by the standing
audit**. Every frame in this report is new.

Probes (all read-only, all in this directory, all re-runnable):

| file | what it decides |
|---|---|
| `probe.mjs` | closed/open geometry across desktop-light/dark, mobile, zoom-200; the `searching` state; nested-popover Escape; the `/admin/users` sibling |
| `probe2.mjs` | the **tallest legal state** (4 sections + Clear-all) at 1440×900, 390×664, 720×450 |
| `probe3.mjs` | `activeFilterCount` step-by-step; six non-hex colour inputs; live-region census |
| `probe4.mjs` | the dead `:checked` contract — close/reopen persistence test |
| `probe5.mjs` | badge hit-test at 3× DPR |
| `probe6.mjs` | **Chromium** keyboard walk + focus registers + unselected-state edges, light and dark |
| `probe7.mjs` | **cross-engine** badge-clip adjudication (WebKit + Chromium) |

Two harness notes, both load-bearing:

- The dev origin at `:9000` has no `VITE_API_URL`, so `demo/platform/transport/availability.ts:107`
  latches `misconfigured` and `assertApiAttemptAllowed()` throws **before any fetch is issued** —
  Playwright route interception can never see the request, `availableTags` stays `[]`, and the Tags
  section never renders. Pass 1 solved this by rewriting the module in flight. **Pass 2 solved it
  differently, and more conservatively: I started a second, throwaway Vite dev server with
  `VITE_API_URL=/api`.** A relative base is same-origin, so `detectDevMisconfig()`
  (`availability.ts:110-114`) returns `false`, the latch never trips, and ordinary
  `context.route()` stubbing works against unmodified application code. No module was patched and
  no repo file was touched. The server was stopped at the end of the run.
- Focus is read in **Chromium**, per the standing rule the repo's own harness records
  (`audit/visual/states.mjs:6-9`): macOS ships Full Keyboard Access OFF, so a WebKit-only focus
  gap is not evidence. This mattered: my WebKit walk appeared to show that the Tags checkboxes,
  the swatch and the Search button were unreachable by Tab. **Chromium disproved it** — they are
  all reachable. That claim is therefore *not* in this report. The residue that survived Chromium
  is in D2-M3.

---

## 2. Visual truth — the frames

### 2.1 The closed state: an unlabelled `⋮` and nothing else

`shots/safari-desktop-light/browse.png`, `…/safari-desktop-dark/browse.png` (standing audit).

The component's entire visible footprint on `/#/browse` is one 32 × 40 ghost capsule bearing
`EllipsisVertical`, seated at the right end of the `SearchBar` pill. Beside it, the mirror route
in the same viewport — **`My Palettes`, the twin field — has no filter affordance at all**. Two
sibling routes with the same job present two different chrome families, which
`VISUAL-CONSTITUTION.md §7` forbids in one sentence: *"Search/filter chrome is one family."*

### 2.2 The open state: an 80.8 %-alpha veil over live display type

`shots/desktop-light-open.png` · `shots/desktop-dark-open.png` · `shots/tall-desktop-dark-open.png`

```
PopoverContent computed (probe2, all matrices identical)
  background-color : oklab(0.936408 0.005529 0.013284 / 0.808)   [light]
                     oklab(0.379439 0.009916 0.016857 / 0.8944)  [dark]
  backdrop-filter  : blur(11px) saturate(1.6)   [light]  /  blur(11px) saturate(1.28) brightness(1.1) [dark]
```

19.2 % of the page transmits through the menu. In `shots/desktop-light-open.png` the Fraunces
display line **"The commons is unreachable."** reads straight through the menu body between
*Newest* and *Most Popular*; "Failed to load pal…" and the *Retry* pill read through below it. Dark
mode is the same defect at 10.6 % transmission. `VISUAL-CONSTITUTION.md §2` reserves the
*instrument veil* tier for "controls genuinely over live color" — a sort/tier/tag menu is not over
live colour, it is over arbitrary body copy, and §4.1 requires that "text, focus, boundaries and
state meet their rendered contrast on the actual material tier."

This converges with pass 1 §1.1 / D-3, from independent frames.

### 2.3 The mobile state is the one that ends the argument

`shots/tall-mobile-open.png` — iPhone 14, 390 × 664, tallest legal state:

```
popover content rect = { x: 104, y: -315.3, w: 240, h: 691.7 }
viewport             = 390 × 664
```

The menu is **691.7 px tall in a 664 px viewport** and the popper has pushed it to **y = −315.3**.
The SORT and TIER sections are entirely above the top of the screen. What remains on screen is
drawn **over the Dock** — the Dock's `Browse` and `Palettes` labels and its search glyph are
visible *through* the menu in the frame — and the *Clear all filters* row lands on top of the
Browse card's own header, where "Browse" and "Discover palettes from the community." read through
it. `VISUAL-CONSTITUTION.md §7`: *"The dock is its own top band, fully visible, focusable, and
clipped by neither mask nor card."*

### 2.4 The badge is an olive crescent

`shots/probe5-badge-3x.png` (WebKit 3×) · `shots/probe7-chromium-badge-3x.png` (Chromium 3×)

With exactly one filter active, the only indication anywhere in the UI is a **leaf-shaped olive
sliver** at the trigger's upper right. The digit is not rendered. Both engines, identical. D2-B3
below has the mechanism.

### 2.5 RTL and forced-colors — the negatives I owe

- `shots/rtl-desktop/browse.png` (standing audit): the trigger correctly mirrors to the pill's
  logical start. **No defect.**
- `shots/tall-forced-colors-open.png`: WebKit does not truly emulate `forced-colors`, so this
  matrix is **inconclusive** and I make no forced-colors claim — except one that survives
  regardless: the badge is *still* a clipped olive crescent in that frame, so the clipping is not
  an artefact of the translucent veil.

---

## 3. Findings

Numbering is `D2-*` so pass-1 IDs are not collided with. `CONV` = independently converges with a
pass-1 finding; `NEW` = not in pass 1; `CORR` = corrects pass 1.

---

### D2-B1 · BLOCKER · CONV(D-1) · Ticking a tag is inert: a whole filter section does nothing

**Mechanism (source).** `SearchFilterBar.vue:51-55`

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

glass-ui 7's `Checkbox` declares neither. From
`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean; value?: SelectionValue; id?: string; class?: HTMLAttributes["class"];
}
// emits: { "update:modelValue": (value: CheckedState) => any }
```

So `checked` falls through as a raw DOM attribute and `@update:checked` becomes an
`onUpdate:checked` entry in `$attrs` that nothing ever fires. `toggleTag()` (`:197-203`) is
**never called**; `update:selectedTags` is **never emitted**; `pm.selectedTags` never changes.
With `modelValue` absent the producer falls back to its own uncontrolled cell, so the box *paints*
checked. The user sees a state the product does not hold.

**Reproduction — `probe4.mjs`, Chromium and WebKit, `/#/browse` with `/colors/tags` stubbed:**

```
DOM proof that `checked` is a fallthrough attribute, not a prop:
  checkboxAttrs = ["data-slot=\"checkbox\"", "class=\"checkbox …\"",
                   "checked=\"false\"",  ← literal string attribute on a <button role=checkbox>
                   "role=\"checkbox\"", "aria-checked=\"false\"", "data-state=\"unchecked\""]

after clicking pastel, neon, earthy (one full tick apart each):
  tags   = [{pastel, ariaChecked:"true"}, {neon,"true"}, {earthy,"true"}, {monochrome,"false"}]
  badge  = null            ← activeFilterCount === 0
  cards  = 2               ← the wall never filtered

after Escape + reopen (the DOM is re-created):
  tags   = [{pastel,"false"}, {neon,"false"}, {earthy,"false"}, {monochrome,"false"}]
  badge  = null
  cards  = 2
```

`probe3.mjs` corroborates from the other end: with tier=featured **and** three tags visibly ticked,
`selectedTagsAfterSequential = ["pastel","neon","earthy"]` while the badge reads `"1"` — the tier
alone.

**Why it is a design defect and not only a bug.** The whole "Tags" section — its `.section-label`,
its `max-h-28` scroller, its divider, its 164.6 px of the popover's height — is furniture for a
capability the surface does not have. `PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either
data, status, labeled action, drag affordance, focus/selection register or removed."* A checkbox
that registers nothing is none of those.

**Cure.** `DropdownMenuCheckboxItem` (exported at
`glass-ui/dist/components/dropdown-menu/index.d.ts`) with `v-model` on a single owned
`selectedTags` model. The producer already owns the whole mechanism.

---

### D2-B2 · BLOCKER · CONV+EXT(D-2) · The tallest legal state is 685.6 px, has no scroller, and puts the only clear-filters control below the fold

Pass 1 measured the **empty** state at 632.6 px. I measured the **tallest legal** state — the one
a user who has actually used the filters sees — with the tags catalogue populated and one filter
set, so the `v-if` Tags section (`:47`) and the `v-if` Clear-all row (`:110`) are both present.

**Reproduction — `probe2.mjs`:**

| arm | viewport | content rect | overflow | consequence |
|---|---|---|---|---|
| desktop | 1440 × 900 | `{x:433, y:381, w:240, h:685.6}` | **+166.6 px below the fold** | `Clear all filters` at `y = 1001.3` → `visibleInViewport: false`; the whole *Find by Color* section at `y = 944.3` |
| mobile | 390 × 664 | `{x:104, y:-315.3, w:240, h:691.7}` | **taller than the viewport** | Sort + Tier off-screen *above*; menu drawn over the Dock |
| 200 % zoom | 720 × 450 | `{x:337.5, y:-390, w:240, h:663.9}` | **taller than the viewport** | Sort, Tier and the top of Tags off-screen above |

There is no containment anywhere. The measured scroll chain from the content up to `<body>`:

```
div.popover-content …   overflowY: visible   maxHeight: none   h 685.6
div (popper wrapper)    overflowY: visible   maxHeight: none   h 685.6
body.relative           overflowY: visible   maxHeight: none   h 900
```

The only `overflow-y: auto` in the component is on the **tag list** (`:49`, `max-h-28`), i.e.
containment was applied to the one region that needed it least while the container that needed it
has none.

**The escalation is the design defect.** `Clear all filters` is the *only* control that clears the
tier or the colour search — there is no per-filter clear anywhere. It is `v-if`-gated on
`activeFilterCount > 0` and appended at the **bottom**, so it materialises exactly when the menu is
at its tallest, i.e. **the control appears only in the state in which it cannot be reached.** At
1440 × 900 it renders 101 px below the viewport with no scroller. This is a designed dead end.

`VISUAL-CONSTITUTION.md §3.6` requires narrow to be "one document-scrolling stage" and
`OPTICAL-BENCH-COMPOSITIONS.md §3` binds Browse's mobile sequence to
"search/filter; result field; selected inspector" — a filter tray that consumes 104 % of the mobile
viewport and hides its own escape hatch is not that sequence.

---

### D2-B3 · BLOCKER · **CORR(D-11)** · The active-filter badge is clipped to an illegible crescent — cross-engine

Pass 1 tested ancestors and recorded a negative: *"the badge is **not** clipped by any ancestor
(`chromium_badgeClip.clippers[].clipsBadge: false`)."* That is true of ancestors and **wrong about
the badge**. The clip is on the trigger **itself**.

`SearchFilterBar.vue:7-12` positions the badge `absolute -right-1 -top-1` — a deliberate 4 px
overhang on both axes — inside a glass-ui `Button` root whose computed style is:

```
probe7.mjs — WebKit AND Chromium, byte-identical results, 1440×900 @3× DPR
  trigger.contain       = "paint"        ← establishes a paint-containment box on the button
  trigger.borderRadius  = "9999px"
  trigger::before.zIndex= "1"            ← the glass-capsule fill layer
  badge.zIndex          = "auto"         ← i.e. 0, beneath that fill
  badge overhang        = 4.1 px top, 4.1 px right
  badgeText             = "1"
```

`contain: paint` clips descendants to the element's padding box; the 9999 px radius then bevels
what remains. Hit-testing the badge's own five cardinal points returns:

```
centre          → span.absolute.-right-1        isBadge true
topEdge         → div.px-4.sm:px-6              isBadge FALSE   ← the pane body behind the trigger
rightEdge       → div.input-bar.search-seated   isBadge FALSE   ← the SearchBar pill behind it
topRightCorner  → div.px-4.sm:px-6              isBadge FALSE
bottomLeft      → span.absolute.-right-1        isBadge true

badgePointsThatHitTheBadge = 2 of 5     (identical in WebKit and Chromium)
```

Frames: `shots/probe5-badge-3x.png`, `shots/probe7-webkit-badge-3x.png`,
`shots/probe7-chromium-badge-3x.png`. At 3× the badge is an olive leaf. **The digit never renders.**

Compounding it (this part converges with pass 1): the trigger carries `aria-label="Filters"`
(`:5`), which overrides its text content, so the count is not announced either — `probe4.mjs`
returns `triggerName: "Filters"`, `triggerText: "1"`, `badgeAnnouncedInName: false`.

So the sole state register of the entire filter system is **invisible to sighted users and absent
for AT users**. `VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value … are explicit."*

**Cure.** glass-ui ships `Badge` (`dist/components/badge/index.d.ts`, with `variant`/`tone`/`size`/
`surface` axes). A count register belongs beside the trigger as a producer atom, or as a producer
affordance on the trigger — never as a hand-positioned overhang inside a `contain: paint` root.

---

### D2-B4 · BLOCKER · CONV(D-19) · "Search by CSS color" accepts one CSS syntax and silently searches a different colour for every other

`SearchFilterBar.vue:88-95` labels the field `aria-label="Search by CSS color"` with
`placeholder="#hex, hsl(...)"`. `:218` is the whole of its parsing:

```ts
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

Anything that is not a 6-digit hex is **replaced by the swatch's colour** and searched as if the
user had asked for it.

**Reproduction — `probe3.mjs`, six inputs, each typed then Search clicked:**

| typed | valid CSS colour? | error shown | swatch after | colour actually searched |
|---|---|---|---|---|
| `hsl(200 50% 50%)` — *the placeholder's own example* | yes | **none** | `rgb(68,136,204)` | `#4488cc` |
| `#abc` | yes | **none** | `rgb(68,136,204)` | `#4488cc` |
| `rebeccapurple` | yes | **none** | `rgb(68,136,204)` | `#4488cc` |
| `oklch(70% 0.15 200)` | yes | **none** | `rgb(68,136,204)` | `#4488cc` |
| `#AABBCC` | yes (accepted) | n/a | `rgb(68,136,204)` | `#AABBCC` |
| `garbage!!` | **no** | **none** | `rgb(68,136,204)` | `#4488cc` |

`errorShown: false` and `rejections: []` on every row. Note the last two rows especially: an
*invalid* input and a *valid, accepted* input produce **the same visible outcome** — the swatch,
the only witness of "what am I filtering by", never moves. There is no state in this component
that distinguishes success from silent substitution.

**Why this is the sharpest design defect in the file.** `parseColorIn` is already imported at
`:145` and used at `:206`. It is value.js's own CSS colour parser — the product's entire reason to
exist — and it parses every row of that table. The regex at `:218` is a gate placed *in front of*
the product's own competence, and it fails **closed to a lie** instead of open to the parser.
`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only … and associated error/status are explicit."* There is no error status here at all.

**Cure.** Delete `:218`'s regex gate. Feed the raw text to `parseColorIn`, catch, and render the two
real states — *parsed → the swatch and the applied-filter chip both take that colour* /
*unparsed → a named error on the field*.

---

### D2-M1 · MAJOR · **NEW** · Five consumer API calls are silently inert against glass-ui 7

This is the family root of several of the geometry findings, and pass 1 records only two of the
five members (`p-0`, `h-8`).

| site | authored | producer contract | rendered | status |
|---|---|---|---|---|
| `:5` `Button variant="ghost"` | `variant` | glass-ui 7 `ButtonProps` has **no `variant`**; its axes are `emphasis: "primary"\|"secondary"\|"quiet"\|"text"` and `tone` (`components/button/Button.vue.d.ts`) | DOM attr `variant="ghost"` alongside `data-emphasis="secondary"` | **inert** |
| `:111` `Button variant="ghost" size="sm"` | `variant` | same | same | **inert** |
| `:52` `Checkbox :checked` | `checked` | `CheckboxProps` declares `modelValue` | DOM attr `checked="false"` | **inert** → D2-B1 |
| `:53` `@update:checked` | — | emits only `update:modelValue` | never fires | **inert** → D2-B1 |
| `:16` `PopoverContent class="w-60 p-0"` | `p-0` | producer emits `px-(--overlay-pad-inline) py-(--overlay-pad-block)` | computed `padding: 20.352px 16px` | **inert** |
| `:5` `Button class="relative h-8 w-8"` | 32 × 32 | `iconOnly` = "square geometry"; `data-size="md"` supplies the block minimum | **32 × 40** | **half-inert** |

Raw DOM proof for the first row (Chromium, `/#/browse`):

```
button[aria-label="Filters"] attributes =
  data-slot="button"  data-emphasis="secondary"  data-tone="neutral"  data-size="md"
  data-icon-only="true"  type="button"  class="button tap-squish focus-ring glass-wash
  glass-capsule glass-capsule-hover relative h-8 w-8"  aria-haspopup="dialog"
  variant="ghost"       ← raw fallthrough, no producer meaning
  aria-label="Filters"
rect = 32 × 40
```

Every one of these is exactly what owner edict 2 forbids — *"no aliases, migration shims, dual
paths, masking fallbacks, back-compat"* — in its most dangerous form: a legacy call that neither
throws nor warns, so the surface looks styled while nothing was applied. And `p-0` / `h-8 w-8` are
also edict 5 (*"style at the root component level, never per-instance overrides"*): the overrides
were both wrong to write **and** lost anyway.

**Consequence that is purely visual.** Because `size` is never passed, the trigger takes
`data-size="md"` and renders **32 × 40 with a 9999 px radius — a vertical stadium** — seated inside
a `SearchBar` whose input measures 374 × 24.6. Its sibling in the same directory,
`UserSortMenu.vue:9`, passes `size="xs"` and no geometry override, and renders a true **28.4 × 28.4
circle** on `/#/admin/users`. Same glyph, same job, two geometries, 41 % different block size.

---

### D2-M2 · MAJOR · **NEW** · Two option lists in one 240 px menu at 57 px and 33 px pitch — a 1.73× rhythm fork

Pass 1 named the `RadioGroup` gap as the cause of the height. The *design* consequence it does not
record is that the component then hand-authored the **other** list at a different pitch, so the
menu contains two rhythms for one species.

**Measured (Chromium, `/#/browse`, popover open):**

```
glass-ui RadioGroup (Sort, Tier)          .filter-option row ink = 31.0 px
  display flex · flexDirection column · gap 26px
  option y = 441.9 → 498.9 → 555.9        pitch 57.0 px

authored tag list (`:49` `flex flex-col gap-0.5`)
  computed gap = 2px                       .filter-option row ink = 31.0 px
  pitch 33.0 px

Sort section  = 197.5 px tall to carry 21.6 (label) + 3 × 31.0 (rows) = 114.6 px of ink
              → 42 % of the section is dead vertical space
```

`shots/tall-desktop-light-open.png` shows it plainly: SORT and TIER read as spaced paragraphs while
TAGS reads as a tight list, eight pixels apart in the same 240 px column.

`VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork."* This is that fork, inside a single popover. `PROPORTION-AUDIT.md
§5.8`: *"Real rendered relation wins over token intent."*

The root cause is a category error: `RadioGroup`'s 26 px is a **form-field** stack gap, sized for
labelled form rows. These are **menu option** rows. `DropdownMenuRadioItem` — which the sibling
`UserSortMenu.vue:22-33` already uses — carries the menu rhythm from the producer, and neither list
would need a local gap at all.

---

### D2-M3 · MAJOR · CONV(D-6) · The radio species has no focus indicator, in either scheme — and the popover shows four different focus treatments

Chromium (per `states.mjs:6-9`), tallest state, both schemes, `probe6.mjs`:

| species | outline | box-shadow | visible ring |
|---|---|---|---|
| `button[role=radio].radio-group__item` (Sort, Tier) | `none 3px …` — style `none`, not painted | `none` | **NO** |
| `button[role=checkbox].checkbox` (Tags) | `none` | `… 0px 0px 0px 2px` | yes |
| `button.block` (the hand-rolled swatch, `:75`) | `none` | cartoon shadow | yes |
| `input.field-control` (colour field) | `none` | `… 0px 0px 0px 2px` | yes |
| `button.absolute` (the hand-rolled Search, `:97`) | **`auto 1px rgb(176,192,210)`** | `none` | yes — **the browser default** |

Two findings in one table. First, the **radio has no focus register at all**, light and dark:
WCAG 2.4.7, and `VISUAL-CONSTITUTION.md §4.1` — *"Focus remains visibly distinct from selection in
both schemes"* — has nothing to be distinct from. Second, the hand-rolled `<button>` at `:97`
carries no `focus-ring` class and falls back to **Chrome's default blue-grey `outline: auto`**, a
register that exists nowhere else in this design system. Four focus vocabularies in a 240 px
surface.

Related, and measured in the same pass: the unchecked checkbox edge is
`1px color(srgb 0.11 0.098 0.09 / 0.12)` in light and `1px color(srgb 0.914 0.9 0.886 / 0.12)` in
dark — a **12 % alpha** 1 px boundary, placed on a translucent floating veil. In
`shots/tall-desktop-dark-open.png` the unchecked *monochrome* box and the unchecked *All* /
*Most Popular* / *Most Forked* radios are effectively invisible. §4.1 again: rendered contrast on
the actual material tier, not token presence.

---

### D2-M4 · MAJOR · CONV(D-10) · Four dividing lines where the binding inventory says zero

`SearchFilterBar.vue:17` — `class="flex flex-col divide-y divide-border"`.

**Measured (`probe2.mjs`, tallest state, all matrices).** Tailwind v4's `divide-y` writes
`border-bottom` on `:not(:last-child)`, which a border-top read would miss:

```
divide-y children: [ {bt:0px, bb:1px, colour rgb(198,180,159)},
                     {bt:0px, bb:1px, …}, {bt:0px, bb:1px, …},
                     {bt:0px, bb:1px, …}, {bt:0px, bb:0px, …} ]
renderedDividerCount = 4
```

`OPTICAL-BENCH-COMPOSITIONS.md §5` is binding and names Browse explicitly:

| Composition | P122 boundaries | reserve | Retained non-P122 dividing line |
|---|---|---|---|
| **Browse** | `n/a` | `n/a` | **none** |

and closes: *"Any additional line, automatic P122 divider, consumer-hidden producer line, terminal
row rule, caster stroke or corner rule is a defect."* Four rendered lines, four defects.
`PROPORTION-AUDIT.md §5.4` gives the reason they are not needed here: interval and material already
express this grouping — as the tag list, which has no divider, demonstrates in the same menu.

---

### D2-M5 · MAJOR · CONV(D-15) · Section headings render in the mono value/provenance voice

Measured `.section-label` computed style, all four sections, all matrices:

```
font-family     "Fira Code"
font-size       14.384px      (--type-caption)
text-transform  uppercase
letter-spacing  1.4384px
font-weight     400
```

Traced to the producer:
`glass-ui/dist/styles/typography/utilities.css` → `.section-label { @apply text-mono-caption; color: var(--muted-foreground) }`
and `@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase }`.

The closed type matrix (`VISUAL-CONSTITUTION.md §4`, restated verbatim in
`OPTICAL-BENCH-COMPOSITIONS.md §5 "Binding type matrix"`) binds:

- *section headings* → `text-heading` + **Plus Jakarta Sans**
- *values, code, provenance* → `text-mono-small` **or** `mono-caption` + **Fira Code**

"Sort", "Tier", "Tags", "Find by Color" are section headings. They are painted in the rung reserved
for values and provenance. Four sites. *(Family note: `.section-label` is the demo's general
section-heading idiom — `demo/DESIGN.md:52` recommends it — so the mechanism is repo-wide and this
component is one site of it. It still counts here, because §4 says the matrix "is closed across
all eighteen compositions.")*

A second, subtler type defect in the same file: `:243` sets
`font-family: var(--font-serif)` on `.filter-option`. It renders correctly as Plus Jakarta Sans —
**only because** glass-ui aliases `--font-serif` → `--font-stack-text` → Jakarta, a bridge that
`demo/styles/foundation.css:95-102` documents as deliberate and fragile ("the three-voice law
reserves Fraunces for display rungs only"). A control row that says "serif" and means "sans" is one
producer change away from flipping every filter option to Fraunces. Write the role, not the alias.

---

### D2-M6 · MAJOR · CONV(D-4) · The god-menu: five unrelated jobs behind one unlabelled `⋮`, and a sibling that already does it right

One anonymous glyph opens a drawer containing: sort mode, curation tier, a tag multi-select, a
colour-distance search with a nested colour picker, and a clear-all. **The component itself knows
these are not one job** — `activeFilterCount` (`:189-195`) deliberately excludes `sort`, because
sort is not a filter. So the badge that describes the drawer cannot describe one of the drawer's
own controls.

Meanwhile the same directory contains `UserSortMenu.vue` — 58 lines — doing the identical
"`⋮` opens a small options menu" job on `/#/admin/users` with entirely different means:

| | `SearchFilterBar` | `UserSortMenu.vue` |
|---|---|---|
| primitive | `Popover` + raw `RadioGroup` + `<label>` | `DropdownMenu` + `DropdownMenuRadioGroup`/`RadioItem` |
| announced semantics | `aria-haspopup="dialog"`, `role="dialog"` | `aria-haspopup="menu"` |
| trigger geometry | 32 × 40 stadium (`h-8 w-8` override, `data-size="md"`) | 28.4 × 28.4 circle (`size="xs"`) |
| glyph | `<EllipsisVertical>` — **not** `aria-hidden` | `<EllipsisVertical aria-hidden="true">` (`:13`) |
| option rows | hand-rolled `.filter-option` recipe, 57 px pitch | producer `DropdownMenuRadioItem`, `text-small` |
| keyboard | no menu semantics, no type-ahead | producer menu keyboard model |

`VISUAL-CONSTITUTION.md §7`: *"Search/filter chrome is one family."* It is two. Owner edict 4
(*"Glass-ui is the design system … reuse existing component-type names"*) names the cure and the
sibling already demonstrates it.

`PROPORTION-AUDIT.md PR-16` rules on this exact glyph species: *"`…` keeps a named menu purpose
plus expanded state or is removed."* This one has `aria-expanded` from the producer, but no visible
purpose and no visible state (D2-B3).

---

### D2-M7 · MAJOR · **NEW** · Applying a filter changes the wall silently — there is no owning status region

`VISUAL-CONSTITUTION.md §5.1`, row *"in-route filter, tab, selection, or pagination"*:

> **Announcement rule:** changed result count/state through the owning status region; no route announcement.

**Measured (`probe3.mjs`, `/#/browse` with the wall populated):**

```
resultDelta = { before: 5, after: 5, liveRegions: 0, statusRoles: 1 }
```

`liveRegions: 0` across the whole document. The single `role="status"` is not this component's and
carries no count. Changing tier, changing sort, or running a colour search re-renders the wall with
no announced count, no announced state, and — since the badge is a crescent (D2-B3) and there are
no applied-filter chips — **no visible summary either**. The user's only way to learn what is
currently filtering the wall is to reopen the drawer and read five separate controls.

This is also §5.1's focus rule for the same row ("initiating control"), which the producer honours,
so the finding is specifically the missing **status**, not the focus.

---

### D2-M8 · MAJOR · **NEW** · The applied colour has no representation anywhere, and no per-filter clear

Three separate absences that compose into one state-truth defect:

1. **The swatch never shows the applied colour.** `applyColorSearch` (`:213-225`) computes `hex`,
   emits, and never writes `pickerHex`. Measured across all six rows of D2-B4's table:
   `swatchBefore === swatchAfter === rgb(68,136,204)` even when `#AABBCC` was accepted and searched.
2. **The badge counts colour-search as `1` with no identity.** `colorSearchActive` (`:171`) is a
   boolean.
3. **`clearColorSearch` is emitted from exactly one place** — `onClearAll` (`:227-232`). There is no
   way to drop the colour filter while keeping the tier, or vice versa. And the one control that
   can clear anything is the one D2-B2 puts below the fold.

`VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace."*
`PROPORTION-AUDIT.md PR-08`: *"Pending/failure/export/recovery truth only transient → ADD-AFFORDANCE
… Persistent entity status/recovery."*

---

### D2-m1 · MINOR · CONV(D-12) · The loading state cannot paint

`:213-225` is `async` but contains no `await`; `emit` is synchronous. `searching` is set `true` and
`false` inside one tick, so Vue never flushes a render with it set.

**Reproduction (`probe.mjs`, MutationObserver + 40 rAF samples across the click):**

```
{ sawSpinner: false, sawDisabled: false, finalText: "Search" }
```

The `Loader2 … animate-spin` (`:102`) and the `disabled:opacity-50 disabled:cursor-not-allowed
disabled:pointer-events-none` register (`:99`) are unreachable. Tranche A's `Ad-13` asked for a
loading state; what landed is a loading state that can never occur — which is worse than none,
because it reads as covered.

---

### D2-m2 · MINOR · CONV(D-5) · The colour field is narrower than its own placeholder

```
input rect      = 148 × 36        padding-right = 64px
scrollWidth 146 = clientWidth 146   (Fira Code 14.384px)
placeholder     = "#hex, hsl(...)"
```

≈ 72 px of usable lane after the 64 px reservation for the absolutely-positioned Search pill. In
`shots/tall-mobile-open.png` the placeholder is visibly truncated to **`#hex…`**. The field cannot
display `oklch(0.7 0.15 200)`, nor `rebeccapurple`, nor its own advertised `hsl(...)` — and
`class="… truncate"` (`:94`) makes the truncation silent.

---

### D2-m3 · MINOR · **NEW** · The primary action of the colour sub-instrument is 11 px

`searchPill` computed: `font-size: 11px`, `color: rgb(112,89,66)` on `bg: oklab(0.965…/0.5)`,
`height: 24px`. The closed matrix binds *"control or label, including dropdown options"* to
`text-small` — which in this very popover computes to **16.4 px** on `.filter-option`. The Search
action is 67 % of the rung its neighbours use, and it is the only *committing* control in the
section. (The same `text-micro` rung, at `font-weight: 700`, carries the badge — and §4's
control/label rung is explicitly **non-bold**.)

---

### D2-m4 · MINOR · **NEW** · Two unnamed radiogroups; the popover has zero semantic structure

`probe4.mjs`:

```
menuRole          = "dialog"
radiogroups       = 2
radiogroupNames   = [null, null]
sectionHeadings   = 0        (h1..h6 inside the popover)
groupRoles        = 0
```

The four visually distinct sections are plain `div`s. The `.section-label` text is never associated
with the group it labels — no `aria-labelledby`, no `<fieldset>/<legend>`, no `role="group"`. AT
receives "Filters dialog" containing two anonymous radio groups and a loose pile of checkboxes.
`VISUAL-CONSTITUTION.md §4.1`: *"Role, accessible name, state/value and associated error/status are
explicit."*

---

### D2-m5 · MINOR · **NEW** · "Find by Color" searches the loaded page, not the commons

`BrowsePane.vue:339-355` filters `pm.filteredBrowse` client-side by OKLab distance, with the
comment *"API also supports server-side via colorL/colorA/colorB params, but client-side is
instant."* `PALETTE-CONTRACT.md:60` records that `GET /palettes` supports a **color-distance
filter** server-side.

The wall is capped and paged ("More from the commons", `BrowsePane.vue:132-144`). So a control
labelled *Find by Color*, inside a field whose placeholder reads *"Search the commons…"*, actually
searches only whatever pages happen to be loaded. The label's scope and the operation's scope
differ, and nothing on screen says so.

---

## 4. Negative results I owe

Findings I looked for and could **not** substantiate. Each is a claim a challenge seat could
plausibly have made; none survives evidence.

| claim | verdict | evidence |
|---|---|---|
| Controls inside the popover are unreachable by Tab | **FALSE** | WebKit suggested it; **Chromium disproved it** (`probe6.mjs`) — all six control species are reachable in DOM order. Reported nowhere in §3, per `states.mjs:6-9`. |
| Motion is ad hoc / ignores `prefers-reduced-motion` | **FALSE** | `.filter-option`'s transition uses `var(--duration-fast) var(--ease-standard)` (`:246`); bare `transition-*` utilities inherit the house tokens via `foundation.css:128-129`; `demo/styles/animations.css:184-192` is a global `prefers-reduced-motion: reduce` guard with the deliberate overlay-opacity carve-out at `:202-210`. No geometry-forcing property is animated. |
| RTL is broken | **FALSE** | `shots/rtl-desktop/browse.png` — the trigger mirrors to the pill's logical start correctly. |
| The component causes horizontal overflow | **FALSE** | `audit/visual/REPORT.json` → `/#/browse`, `overflowX: 0` in all four matrices; my own probes agree at 390, 720 and 1440. |
| Touch targets are undersized | **FALSE** | `[role=radio]` measures **44 × 44** around an 18 × 18 visible mark — exactly `PROPORTION-AUDIT.md §5.7` ("visual glyph size, operable target size and layout reservation are separate quantities") and `PR-12`. `REPORT.json` flags no tap target belonging to this component. |
| `verbatimModuleSyntax` violation | **FALSE** | `:144` is `import type { Tag }`; every other import is value-position. Clean. |
| Vue 3.5 idiom violation | **FALSE** | `:147` uses reactive props destructure correctly; no template refs are needed, so `useTemplateRef` is not applicable; no `defineModel` round-trip exists, so `shallowRef` is not applicable. |
| Escape inside the nested MiniColorPicker mismanages focus | **FALSE** | `probe.mjs`: after Escape, `openDialogs 2 → 1`, outer stays `aria-expanded="true"`, focus returns to `button[Open color picker…]` — the exact connected opener, which is `VISUAL-CONSTITUTION.md §5.1`'s rule. |
| Pass 1's D-11 "the badge is not clipped" | **OVERTURNED** | see D2-B3 — cross-engine, five-point hit-test, 3× frames. |

---

## 5. The cure — one transposition, not seventeen patches

Every finding above except D2-B4 and D2-m5 dissolves in the same move, and the sibling in the same
folder is the worked example.

1. **Transpose onto the glass-ui menu family.** `DropdownMenu` + `DropdownMenuLabel` +
   `DropdownMenuRadioGroup`/`RadioItem` + `DropdownMenuCheckboxItem` + `DropdownMenuSeparator`,
   exactly as `UserSortMenu.vue:1-37` already does. That single move kills D2-B1 (the checkbox
   contract becomes `v-model`), D2-M2 (menu rhythm comes from the producer), D2-M3 (one producer
   focus register), D2-M4 (dividers become an explicit `Separator` decision, and Browse's answer is
   *none*), D2-M6 (one family), D2-m4 (menu semantics carry the names) and D2-M1's `p-0`/`variant`
   rows. `UserSortMenu.vue` is 58 lines. This file is 249.
2. **Split the drawer.** Sort is not a filter — the component's own `activeFilterCount` says so.
   Sort belongs beside the field as its own named control; filters keep the badge.
3. **Move the count to `Badge`.** A producer atom outside the `contain: paint` root, and inside the
   trigger's accessible name (`aria-label="Filters, 2 active"`). Kills D2-B3.
4. **Give the colour search to the parser.** Delete `:218`'s regex gate; call `parseColorIn` on the
   raw text; render two real states (applied → the swatch takes that colour and a removable chip
   appears / unparsed → a named error on the field). Kills D2-B4, D2-M8 and D2-m1 — the `searching`
   register becomes reachable the moment the search is genuinely asynchronous, or is deleted
   honestly.
5. **Surface the applied set.** Removable chips under the search bar are the standard answer to
   D2-M7/D2-M8 and they retire the "the only clear control is below the fold" trap of D2-B2 on
   their own.

Residual after the transposition: **D2-m5** (client-side vs. server-side colour distance) is a
`BrowsePane` + api decision, not this component's; **D2-M5**'s `.section-label` rung is a repo-wide
family that needs a canon ruling, not a local fix.

---

## 6. Ledger

| id | severity | kind | one line |
|---|---|---|---|
| D2-B1 | BLOCKER | CONV(D-1) | `:checked`/`@update:checked` are inert on glass-ui 7 → the tag filter paints checked and does nothing; state dies on reopen |
| D2-B2 | BLOCKER | CONV+EXT(D-2) | tallest state 685.6 px, no scroller anywhere in the chain; `Clear all filters` renders 101 px below the fold at 1440×900; mobile at `y=−315.3`; zoom-200 at `y=−390` |
| D2-B3 | BLOCKER | **CORR(D-11)** | the badge is clipped by the trigger's own `contain: paint` + 9999 px radius — 2 of 5 hit-test points, cross-engine; digit never renders; also absent from the accessible name |
| D2-B4 | BLOCKER | CONV(D-19) | `hsl()`, `#abc`, `rebeccapurple`, `oklch()` all silently search `#4488cc` with no error, while `parseColorIn` sits imported two lines away |
| D2-M1 | MAJOR | **NEW** | five inert consumer API calls (`variant`×2, `checked`, `update:checked`, `p-0`) + one half-inert (`h-8 w-8` → 32×40) |
| D2-M2 | MAJOR | **NEW** | 57 px vs 33 px option pitch in one 240 px menu; Sort section 42 % dead space |
| D2-M3 | MAJOR | CONV(D-6) | radio species has no focus ring in either scheme; four focus vocabularies incl. the browser default on the hand-rolled Search button; 12 %-alpha unchecked edges |
| D2-M4 | MAJOR | CONV(D-10) | 4 rendered `border-bottom` dividers; `OPTICAL-BENCH-COMPOSITIONS.md §5` binds Browse to **none** |
| D2-M5 | MAJOR | CONV(D-15) | 4 section headings render Fira Code uppercase (`mono-caption`), the value/provenance rung; plus `--font-serif` used for the sans control voice |
| D2-M6 | MAJOR | CONV(D-4) | god-menu: 5 jobs behind one unlabelled `⋮`; `UserSortMenu.vue` does the same job in 58 lines with the producer family |
| D2-M7 | MAJOR | **NEW** | `liveRegions: 0` — filter changes announce no result count; §5.1's in-route-filter row unmet |
| D2-M8 | MAJOR | **NEW** | the applied colour is never shown (swatch never updates, even on success) and no per-filter clear exists |
| D2-m1 | MINOR | CONV(D-12) | `searching` cannot paint — `sawSpinner: false, sawDisabled: false` over 40 rAF |
| D2-m2 | MINOR | CONV(D-5) | 148 px field with 64 px right pad truncates its own placeholder to `#hex…` |
| D2-m3 | MINOR | **NEW** | the Search commit action is 11 px where its neighbours are 16.4 px, and the badge is `text-micro` **bold** |
| D2-m4 | MINOR | **NEW** | 2 unnamed radiogroups, 0 headings, 0 `role=group` inside the popover |
| D2-m5 | MINOR | **NEW** | "Find by Color" filters the loaded page client-side while the field says "the commons" and the api offers a server-side colour-distance filter |

**Strongest single defect:** D2-B1 — an entire filter section that paints a state the product does
not hold, because a retired API was called against a live one and nothing anywhere said so.

---

## 7. Files

```
challenge-D-design.md                     this pass-2 report
challenge-D-design-pass1-c654824e.md      the preserved pass-1 report (unmodified)
probe.mjs   probe2.mjs   probe3.mjs   probe4.mjs   probe5.mjs   probe6.mjs   probe7.mjs
shots/desktop-light-open.png              the 80.8 % veil over live display type
shots/desktop-dark-open.png               the same in dark
shots/tall-desktop-light-open.png         tallest state, 166.6 px past the fold
shots/tall-desktop-dark-open.png          tallest state, dark; invisible unchecked marks
shots/tall-mobile-open.png                691.7 px menu at y = −315.3 over the Dock
shots/tall-zoom200-open.png               200 % zoom, y = −390
shots/tall-forced-colors-open.png         inconclusive matrix; badge still a crescent
shots/probe5-badge-3x.png                 the badge at 3× (WebKit)
shots/probe7-webkit-badge-3x.png          badge clip, WebKit
shots/probe7-chromium-badge-3x.png        badge clip, Chromium — identical
shots/desktop-light-nested-open.png       popover inside popover, both z-130
shots/probe6-light-tabbed.png             Chromium focus walk, light
shots/probe6-dark-tabbed.png              Chromium focus walk, dark
```

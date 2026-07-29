# CHALLENGE-D — `SearchFilterBar.vue` · the design is flawed — **PASS 3**

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context arm), as
declared at spawn. The seat is declared, not inherited, and not defaulted.

---

## 0. Standing of this document

Two CHALLENGE-D seats ran before me. I did **not** open either report until every probe below had
finished and its JSON was on disk; that ordering is the point of a third pass. All prior artifacts
are preserved:

| file | what it is |
|---|---|
| `challenge-D-design-pass1-c654824e.md` | pass 1 (814 lines, D-1…D-19) |
| `challenge-D-design-pass2-c654824e.md` | pass 2, markdown form (766 lines, D2-B1…D2-m5) |
| `challenge-D-design-pass2-hydrated-payload.md` | pass 2, structured-payload form re-materialised by the M-16 harvest at 17:46 (same seat, same findings) |
| **this file** | **pass 3** |

This pass does four things:

1. **Re-derives** the four BLOCKER-class results from a different harness, a different API-stub
   mechanism, a different device-scale factor (4× vs 3×), and a pixel-readback path neither prior
   pass used. Three independent passes converging on one measured number ends the argument.
2. **Adds thirteen findings neither ledger contains** — including the one that explains the visual
   ugliness better than "the alpha is too low": *the menu is painted on two different grounds, and
   the seam runs through the colour-specimen section.*
3. **Adjudicates three prior disputes** and **withdraws one claim of my own** on measurement.
4. **States its negative proofs.** Nine axes I attacked and could not break are listed with the
   evidence that proves the negative, so the next pass does not re-spend the budget.

| | |
|---|---|
| Component | `demo/palettes/browser/search/SearchFilterBar.vue` — 249 lines, 125 template lines, area `palettes` |
| Sole consumer | `demo/palettes/BrowsePane.vue:15-26`, slotted into glass-ui `SearchBar`'s default slot (`BrowsePane.vue:10`) |
| Route | `/#/browse` only |
| Repo state measured | working tree at `f36f780c`; **`git diff --quiet c654824e HEAD -- demo/palettes/browser/search/SearchFilterBar.vue` exits 0** — the subject is byte-identical to the declared `c654824e`, last touched by `a61094e3` |
| Producer | `@mkbabb/glass-ui@7.0.0` |
| Engines | WebKit (the shipped Safari engine) for all geometry/pixel work; **Chromium** for forced-colors and for both focus adjudications, per the repo's own rule at `audit/visual/states.mjs:6-9` |
| **Pass-3 verdict** | **DEFECTIVE.** 4 BLOCKER · 13 MAJOR · 6 MINOR · 1 INFO |

### The gestalt, from pass 3's angle

Pass 1 said the defect is "a hand-rolled clone of a menu family glass-ui already ships". Pass 2 said
it is "five consumer API calls silently inert against glass-ui 7". Both are true. Pass 3's addition
is **geometric and material** — the part you see before you read any code:

> **This surface has no rail, no rhythm and no ground.** Seven distinct left rails share one 206 px
> column. Sibling options sit 4.33× further from each other than from their own section heading.
> And 29.4 % of the menu's height hangs off the bottom of the card it was drawn over, so the menu's
> own background steps by ΔRGB 71.6 partway down its body — with the seam falling exactly across
> `FIND BY COLOR`, the one section whose whole job is to show a colour truthfully.

Those are not three bugs. They are one cause: **a form was pasted into a menu.** The component
imports glass-ui's *form* `RadioGroup` (measured default `gap: 26px` — a settings-page rhythm) and
glass-ui's *floating-glass* `Popover` (80.8 % alpha + `blur(11px) saturate(1.6)` — chrome material),
and hand-corrects neither. Its own sibling in the same directory — `UserSortMenu.vue`, 58 lines —
does the same job with `DropdownMenu*` and gets rail, rhythm, ground, focus and semantics for free.

---

## 1. What I ran

Every probe is in this directory, is read-only, and re-runs with `node <probe>` against the live dev
server (`PROBE_ORIGIN` overrides the origin). No source file was touched.

| probe | decides | output |
|---|---|---|
| `probe-P3-1-register.mjs` | dead-class scan · alignment ladder · type register · colour-row baseline · divider census · tap targets · popover a11y | `evidence-p3/P3-1-register.json` + 3 shots |
| `probe-P3-2-states.mjs` | 7-matrix sweep (desktop light/dark, mobile, forced-colors, reduced-motion, zoom-200, RTL): hit sweep · divider borders · light-source census · motion · viewport containment · badge hit-test | `evidence-p3/P3-2-states.json` + 14 shots |
| `probe-P3-3-truth.mjs` | glass-ui API-leak census · the `searching` dead state (30 rAF) · six colour-syntax substitutions · Chromium forced-colors arm | `evidence-p3/P3-3-truth.json` |
| `probe-P3-4-pixels.mjs` | **rendered** contrast: 4× screenshots read back through a canvas, ink/ground by histogram | `evidence-p3/P3-4-pixels.json` + 4 crops |
| `probe-P3-5-rails.mjs` | the seven-rail census to 0.01 px · the two-ground measurement | `evidence-p3/P3-5-rails.json` |
| `probe-P3-6-close.mjs` | close contract · group names · trigger name (WebKit) | `evidence-p3/P3-6-close.json` |
| `probe-P3-7-aria.mjs` | the computed accessibility tree of the open popover | stdout, transcribed in §5 |
| `probe-P3-8-chromium.mjs` | **Chromium adjudication**: focus register per species, both schemes; Escape vs click-outside close | `evidence-p3/P3-8-chromium.json` |

The standing Safari matrix cannot substitute for any of it. `audit/visual/REPORT.json` → `/#/browse`
reports `probe.counts.dialog: 0` in **all four** matrices, and its `a11y.smallTapTargets` list holds
only `PaletteSlugBar` controls. The popover is closed in every standing frame: **107 of this
component's 125 template lines have never been photographed by the standing audit.**

---

## 2. Visual truth first

### 2.1 Desktop, open, 4× — `shots-p3/P3-px-light-popover.png`

One crop carries every geometric finding in this report:

- **`SORT` lines up with nothing it labels.** Its ink starts at 461.75; the marker's visible ink at
  469.75; the option text at 517.75; the divider under it at 449.75. Four left edges, none shared.
- **The three sort options read as three unrelated items**, not one group: the gap between them
  (26 px) is nearly the row height (30.94 px).
- **`All` and `Featured` do not share a left edge** — 495.75 vs 517.75, a 22 px rag *inside one radio
  group*, because `All` has no icon and no lane was reserved for the one it lacks.
- **`Clear all filters` is the loudest object in the menu.** A reset — the quietest verb on the
  surface — renders as a large filled capsule outweighing everything above it (§5, P3-M10).
- **The swatch casts down-and-LEFT** while every card in the app casts down-and-RIGHT.
- **The bottom of the menu is a different colour from the top.** The band behind `FIND BY COLOR` is
  pink; the band behind `SORT` is cream.

### 2.2 Both schemes — `shots-p3/P3-desktop-{light,dark}-open.png`

The page behind the menu reads *through* it. In both schemes the words "…s is unreachable." (the
Browse empty state's display-scale headline) are legible on top of "Most Popular" and "Most Forked".
Computed material: `background-color: oklab(0.936408 0.005529 0.013284 / 0.808)`,
`backdrop-filter: blur(11px) saturate(1.6)` — chrome material carrying a seven-control form.

### 2.3 Mobile — `shots-p3/P3-tall-mobile-open.png` (iPhone 14, 390 × 664)

The first thing visible at the top of the screen is **"Most Forked"**. `SORT`, `Newest` and
`Most Popular` are above the viewport. Measured: `dialog.y = −154`, `overflowY: "visible"`,
`scrollHeight (528) === clientHeight (528)`. **154 px of a 530 px menu — 29 % — is off-screen with no
scroller anywhere in the chain. On an iPhone the Sort filter cannot be operated at all.**

### 2.4 200 % zoom — `shots-p3/P3-tall-zoom200-open.png` (720 × 450 @ dsf 2)

`dialog.y = −227.5` of a 501.64 px menu — **45.4 % above the fold**, no scroller. The whole `SORT`
section *and* the `TIER` heading are gone. The menu also paints over the top dock.

### 2.5 The badge — `shots-p3/P3-px-{light,dark}-badge.png` (4× crops)

The active-filter count does not render as a chip. It renders as **an olive leaf**. The digit is
entirely absent in light; in dark a two-pixel wedge of the "1" survives. Pixel census of the light
crop: surviving gold bbox `46 × 45` device px at DPR 4 = **11.5 × 11.25 CSS px of an intended
16.2 × 16.2 chip — 49.3 % of the badge area is painted away.**

### 2.6 Forced colors — `shots-p3/P3-tall-forced-colors-open.png`

The comic result stands: WebKit's forced-colors arm makes the popover opaque, and **the menu is
dramatically more readable in high-contrast mode than in its designed one.** That is a diagnosis,
not a compliment.

---

## 3. The rail census and the rhythm ledger

CSS px at 1440 × 900, WebKit, DPR 4, from `evidence-p3/P3-5-rails.json`.

### 3.1 Seven left rails in a 206 px column

| x | what sits there |
|---:|---|
| 432.75 | popover box left |
| **449.75** | `.filter-section` box left — **and both ends of every divider** (449.75 → 655.75) |
| **456.75** | the radio's 44 × 44 hit box — it breaks 5 px *out* of the section it lives in |
| **461.75** | `.section-label` ink · the colour swatch · the `Clear all filters` button box |
| **469.75** | the radio's **visible** ink |
| **485.20** | the `Clear all filters` *text* ink (centred, so it agrees with nothing) |
| **495.75** | the colour `<input>` · the text of `All` |
| **517.75** | the text of `Newest` / `Most Popular` / `Most Forked` / `Featured` |

Rail spread `517.75 − 449.75 = 68.0 px` inside a `206 px` content box — **33 % of the column is
consumed by disagreement about where "left" is.** The section heading is 8 px left of the marker it
heads and 56 px left of the text it heads.

Arithmetic consequences:

- Option text begins **85.0 px into a 240 px menu (35.4 %)**.
- Residual measure for an option label: **126.0 px** (517.75 → 643.75); `Most Popular` already uses
  110 px of it.
- Nested padding: producer `16 px` (the `p-0` the component asked for is inert — P3-M10) **plus**
  local `.filter-section` `12 px` = **28 px per side; 23.3 % of the menu's width is padding**.

### 3.2 The rhythm is inverted

| interval | measured | source |
|---|---:|---|
| option row height | 30.94 px | rendered |
| **gap between sibling options** | **26.00 px** | glass-ui `.radio-group` default `gap: 26px` |
| **gap from section label to its first option** | **6.00 px** | `SearchFilterBar.vue:239` |
| section block padding | 12 px | `SearchFilterBar.vue:238` |
| Clear-all row block padding | 8 px | `SearchFilterBar.vue:110` (`py-2`) |

`26 / 6 = 4.33`. **Every option is 4.33× closer to the heading of its group than to its own
siblings.** Gestalt proximity therefore reads five separate things, each belonging to the label
above it — which is exactly how the screenshot reads.

The cause is named and measured: `radioGroupClass: "radio-group"`, `radioGroupGap: "26px"` — the
producer's **form** rhythm, correct for a settings page, imported whole into a **240 px menu**. The
producer's *menu* rhythm lives on `DropdownMenuRadioItem`, which `UserSortMenu.vue:20-33` uses.

### 3.3 The control column has three heights

| control | desktop | mobile |
|---|---:|---:|
| colour swatch (`h-7`, fixed) | 28 | 28 |
| colour `<input>` (`size="sm"`, producer-scaled) | 36 | **54** |
| `Clear all filters` | 36 | 52 |

The swatch is the only 28 px object among 36 px peers on desktop and **1.93× shorter than the field
beside it** at mobile — the mismatch *widens* as the screen narrows. Optical centres also disagree
by 1.0 px (796.72 vs 797.72).

---

## 4. State coverage

| state | shipped? | evidence |
|---|---|---|
| default / populated | yes | `shots-p3/P3-px-light-popover.png` |
| closed trigger, 0 filters | yes | `shots-p3/P3-desktop-light-open.png` |
| closed trigger, ≥1 filter | **broken** | badge clipped to 49.3 % of its area, digit absent — P3-B3 |
| **tag catalogue empty** | **undesigned** | section vanishes (`v-if`, line 47); no empty copy |
| **tag catalogue failed** | **undesigned, and identical to empty** | `useTagEdit.ts:46-48` `catch { }`; absent in 10/10 of my matrices — P3-M11 |
| tag selected | **inert** | `:checked` / `@update:checked` are not glass-ui 7 API — P3-B1 |
| **loading (`searching`)** | **unreachable** | 30 rAF: `sawSpinner: 0, sawDisabled: 0` — P3-m1 |
| **colour parse error** | **absent** | 6 rejected inputs → 0 `[role=alert]`, `aria-invalid: null` — P3-B4 |
| disabled | only dead `disabled:` classes on the Search pill (line 99) | — |
| focus | **the radio species paints nothing**; four vocabularies overall — P3-M14 | Chromium, both schemes |
| hover | one, tokenized (`filter-option:hover`, line 248) — SOUND | — |
| active / pressed | producer `tap-squish` on Buttons; nothing on the two hand-rolled buttons | `triggerClass` |
| **overflowing** | **no scroller anywhere** | `scrollH === clientH` in 7/7 — P3-B2 |
| truncated | placeholder truncates to `#hex, …` in a 148 px field with a 64 px reserve | P3-m5 |
| RTL | popover mirrors; the badge stays physically `-right-1 -top-1` | `P3-tall-rtl` |
| reduced motion | **handled** — see §6.2 | 77 blanket rules |
| forced colors | **the swatch loses its only content** — P3-M13 | Chromium |
| zoomed 200 % | **45.4 % of the menu above the fold** | P3-B2 |

---

## 5. Findings

**NEW** = in neither prior ledger · **CONV** = converges by independent measurement ·
**CORR** = corrects a prior claim.

---

### P3-B1 · BLOCKER · CONV(D-1, D2-B1) · The Tags filter speaks a retired API and cannot work

Static proof, no render required. glass-ui 7 ships
(`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts`):

```ts
export interface CheckboxProps … { modelValue?: CheckedState | null; defaultValue?: CheckedState; … }
emits: { "update:modelValue": (value: CheckedState) => any }
```

`SearchFilterBar.vue:51-55` passes:

```vue
<Checkbox :checked="selectedTags.includes(tag.name)" @update:checked="toggleTag(tag.name)" />
```

`checked` is not a prop → it lands as a DOM attribute. `update:checked` is not an emit → `toggleTag`
(line 197) is never called and the `update:selectedTags` emit declared at line 156 has no live
caller. **An entire filter section is decorative**, and because `modelValue` is absent the producer
runs uncontrolled, so the box *paints* checked while nothing filters. Vue fallthrough fails
silently, which is how this survived the 7.0.0 adoption.

---

### P3-B2 · BLOCKER · CONV+EXT(D-2, D2-B2) · No scroller — and at mobile and 200 % zoom the menu overflows the **top**

`evidence-p3/P3-2-states.json`, tallest reachable state, 7 matrices:

| matrix | dialog `y` | height | above fold | below fold | `overflowY` | scroller |
|---|---:|---:|---:|---:|---|---|
| desktop 1440×900 | 381 | 521.06 | 0 | 2.06 px | `visible` | `scrollH 519 == clientH 519` → **none** |
| **mobile 390×664** | **−154** | 530.41 | **154 px (29 %)** | 0 | `visible` | **none** |
| **zoom-200 720×450** | **−227.5** | 501.64 | **227.5 px (45.4 %)** | 0 | `visible` | **none** |
| forced-colors / reduced-motion / RTL | 381 | 521.06 | 0 | 2.06 px | `visible` | none |

The extension over pass 2: at mobile and zoom the failure is **at the top**. Reka flips the menu
upward because it will not fit below; nothing constrains the flip and nothing scrolls. The user does
not lose a convenience at the bottom — they lose **`Sort`, the first thing in the menu**, entirely.

The one `overflow-y: auto` in the whole component is on the tag list (`line 49`, `max-h-28`) — the
region that needed containment least.

---

### P3-B3 · BLOCKER · CONV(D2-B3) / CORR(D-11) · The count badge is clipped to 49.3 % of its area; the digit never renders

Three measured facts:

1. **The trigger is not square.** `Button`'s `iconOnly` is documented in
   `Button.vue.d.ts` as *"Square geometry for an accessibly named icon command."* The component adds
   `class="relative h-8 w-8"` (line 5). Measured rect **32.48 × 40.60**: the width override won, the
   height override lost to the producer's `data-size=md`. `icon-only` therefore ships a 1.25 : 1 pill.
2. **The trigger establishes paint containment.** `getComputedStyle(trigger).contain === "paint"`,
   with a capsule radius, in 7/7 matrices.
3. **The badge overhangs it.** `-right-1 -top-1` (line 9) → measured overhang **4.1 px** top and
   **4.1 px** right.

Hit test on 3 cardinal points, **7 of 7 matrices**: centre `true`, top `false`, right `false`.
Pixel census at 4×: surviving gold bbox `46 × 45` device px = `11.5 × 11.25` CSS px of a nominal
`16.2 × 16.2` chip → **49.3 % painted away, including the entire glyph.**
Frames: `shots-p3/P3-px-light-badge.png`, `P3-px-dark-badge.png`.

**The count never reaches assistive technology either.** The trigger's accessible name is
`aria-label="Filters"` (line 5), which overrides its own `textContent: "1"`. The computed tree is
exactly `- button "Filters" [expanded]: - img`. There is no state in which any user — sighted or
not — learns how many filters are active.

---

### P3-B4 · BLOCKER · CONV(D-19, D2-B4) · The colour field advertises `hsl(...)` and searches something else

`SearchFilterBar.vue:218`:

```ts
const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
```

Anything that is not exactly `#rrggbb` is silently replaced by the picker's current value. The
placeholder (line 92) advertises `#hex, hsl(...)`.

Six inputs driven live (`evidence-p3/P3-3-truth.json` → `substitution`):

| typed | field keeps | swatch says | badge | `[role=alert]` | `aria-invalid` |
|---|---|---|---:|---|---|
| `hsl(200 50% 50%)` | `hsl(200 50% 50%)` | `#4488cc` | `1` | none | `null` |
| `rebeccapurple` | `rebeccapurple` | `#4488cc` | `1` | none | `null` |
| `oklch(0.7 0.15 30)` | `oklch(0.7 0.15 30)` | `#4488cc` | `1` | none | `null` |
| `#abc` | `#abc` | `#4488cc` | `1` | none | `null` |
| `not-a-color` | `not-a-color` | `#4488cc` | `1` | none | `null` |
| `#FF0000` | `#FF0000` | `#4488cc` | `1` | none | `null` |

Note the last row: **even a valid six-digit hex leaves the swatch showing `#4488cc`** — the swatch is
never updated from `applyColorSearch`. So for every input the user sees their text in the field, a
different colour in the swatch, and a badge asserting one active filter, while the product searched a
third thing. `parseColorIn` — the library's own parser, which handles all six — is already imported
at line 145 and used at line 206.

---

### P3-M1 · MAJOR · **NEW** · The menu is painted on two grounds, and the seam runs through the colour section

The popover is `glass-floating` (`0.808` alpha, `backdrop-filter: blur(11px) saturate(1.6)`), so its
effective ground is *whatever is behind it*. Measured (`evidence-p3/P3-5-rails.json`):

| quantity | value |
|---|---:|
| Browse card rect | `y 232 → bottom 747.84` |
| popover rect | `y 380 → bottom 901.06` |
| popover height hanging **below** the card | **153.22 px** |
| as a fraction of the menu | **29.4 %** |

Pixel readback of the menu's own body at 4× (modal colour per band):

| band | ground |
|---|---|
| top 8 % | `rgb(241, 224, 220)` |
| middle | `rgb(241, 223, 220)` |
| **bottom 10 %** | **`rgb(199, 183, 179)`** |

`ΔRGB(top, bottom) = 71.6`; luminance ratio between the menu's own top and bottom ground
**1.47 : 1**. `ΔRGB(top, mid) = 1.0` — so this is a **step**, not a gradient, and the step is where
the card ends.

Two consequences:

1. **The same ink has two contrasts inside one control.** `.section-label` measures 5.67 : 1 on the
   top ground; `FIND BY COLOR` sits on the bottom one.
2. **The colour specimen has no well.** `VISUAL-CONSTITUTION.md §2` gives the specimen tier an
   *"opaque/quiet neutral stage; the specimen supplies color."* The 28 px swatch — the only object
   here whose entire job is to state a colour truthfully — is seated on a translucent, blurred,
   `saturate(1.6)`-backed slab over a live chromatic aurora.

This is the *mechanism* behind pass 1's D-3 ("80.8 % alpha") and it is worse than alpha alone: alpha
you can raise; a surface taller than the plate it was drawn over changes material partway down at
any alpha.

---

### P3-M2 · MAJOR · **NEW** · Seven left rails in a 206 px column

Census in §3.1, measured to 0.01 px by range geometry rather than box geometry. Pass 1's D-9 counted
*three text origins*; this is the complete rail set, including the divider rail (449.75), the hit-box
rail (456.75) and the marker-ink rail (469.75).

The most visible instance: **the section heading sits 8 px LEFT of the marker column it heads**,
because `.filter-option` carries `padding: 0.25rem 0.5rem` (line 241) inside a `.filter-section` that
carries `padding: 0.75rem` (line 238). The option's *hover chip* is not inset, so the hover
background begins exactly under the section label while the option's own marker does not.

---

### P3-M3 · MAJOR · **NEW** · Proximity is inverted, because a form's rhythm was imported into a menu

Sibling-option gap **26.00 px** vs section-label→group gap **6.00 px** — ratio **4.33×** (§3.2). The
26 px is not authored here: it is `getComputedStyle('[role=radiogroup]').gap` on glass-ui's
`.radio-group`, the producer's **form** rhythm, never overridden. `UserSortMenu.vue` never meets this
problem because `DropdownMenuRadioItem` carries menu rhythm.

---

### P3-M4 · MAJOR · **NEW** · A 22 px rag inside one radio group

`optionTextInk`: `All` → **495.75**; `Featured` → **517.75** — both options of the same `Tier` group.
`All` (lines 34-37) has no icon; `Featured` (lines 38-42) has `<Award>`. The row is a bare
`display:flex; gap:0.5rem`, so omitting the icon collapses its 14 px lane plus the 8 px gap and drags
the label 22 px left. Visible in `shots-p3/P3-px-light-popover.png`.

---

### P3-M5 · MAJOR · CONV+EXT(D-10, D2-M4) · Dividers where the binding inventory says `none` — and they are invisible anyway

`OPTICAL-BENCH-COMPOSITIONS.md:69-90`, the binding table:

> `| Browse | n/a | n/a | none | one Card edge per palette entity supplies object containment; field/inspector use interval |`

and line 90: *"Any additional line, automatic P122 divider, consumer-hidden producer line, terminal
row rule, caster stroke or corner rule is a defect."*

`SearchFilterBar.vue:17` writes `divide-y divide-border`. Measured: **3 rendered
`border-bottom: 1px` lines in all 7 of my matrices** (the tags section is unreachable in this
environment — with it, pass 2 measured 4). Tailwind v4 writes `border-bottom` on `:not(:last-child)`,
so a border-top-only read misses them; my first probe made exactly that mistake and probe 2 corrected
it.

**The extension neither prior pass made** — their *rendered* contrast, from pixels at 4×:

| scheme | divider ink | ground | contrast |
|---|---|---|---:|
| light | `rgb(198,180,159)` | `rgb(241,223,220)` | **1.57 : 1** |
| dark | `rgb(101,87,73)` | `rgb(79,65,59)` | **1.40 : 1** |

The component pays three forbidden lines that cannot do the grouping job they were added for. That
changes the cure: not "make them subtler" but **delete — they were never carrying the grouping**.
(Fix the 26 px rhythm of P3-M3 and the line has nothing left to do.) Their geometry is also a third
rail: they run `449.75 → 655.75`, reaching neither the popover edge nor the content rail.

---

### P3-M6 · MAJOR · **NEW** · The swatch's caster opposes the house light source

Measured in one frame (`evidence-p3/P3-2-states.json` → `light`):

| object | rendered offsets |
|---|---|
| live Browse **Card** | `8px 8px 0 0` — **down-right** |
| `--shadow-cartoon` / `--shadow-card` | `8px 8px 0 0` — down-right |
| **the colour swatch** (`shadow-cartoon-sm`, line 76) | `-2px 2px`, `-3px 3px`, `-4px 4px` — **down-LEFT** |
| `.search-seated` search bar (same token) | `-2px 2px / -3px 3px / -4px 4px` — down-left |

Two light sources in one composition, both visible in `shots-p3/P3-tall-mobile-open.png`.

Beyond direction: `VISUAL-CONSTITUTION.md §2` gives the *instrument veil* tier "**no drop shadow**",
and §3 law 8 forbids supporting fixtures competing "through equal size or equal shadow". The swatch
is the **only** object inside this glass popover that casts any shadow — a paper-grammar caster
stamped on a control floating on glass. In dark it is also inert: a light-tinted stamp at 26–46 %
alpha on a dark ground is invisible in `shots-p3/P3-desktop-dark-open.png`. Wrong in light, absent in
dark.

---

### P3-M7 · MAJOR · CONV(D-4, D2-M6) · Hand-rolled where the producer ships the part — three times, in a folder that already does it right

| hand-rolled here | glass-ui 7 ships | already wired in `demo/ui/`? |
|---|---|---|
| `Popover` + `RadioGroup` + `Checkbox` as a menu (125 template lines) | `DropdownMenu`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuCheckboxItem`, `DropdownMenuLabel`, `DropdownMenuSeparator` | **yes** — `demo/ui/dropdown-menu/index.ts` re-exports all 14 |
| the count chip (lines 7-12: `bg-primary text-primary-foreground rounded-full text-micro font-bold`) | `Badge` — whose `VARIANT.default` is literally `"bg-primary text-primary-foreground"` | **yes** — `demo/ui/badge` |
| the inline `Search` commit + spinner + `disabled:` classes (lines 97-104) | `Button` with `loading?: boolean` ("Marks an in-flight command and suppresses activation until it settles") and `disabled` | **yes** — `demo/ui/button` |

The count chip's class list is a transcription of the producer's own variant string out of
`dist/components/badge/index.d.ts`. Edict 4 ("glass-ui is the design system") and edict 5 ("style at
the root, never per-instance") fail at the same coordinate. `UserSortMenu.vue` — same folder, same
job class, 58 lines — removes any argument about feasibility.

---

### P3-M8 · MAJOR · **NEW** · Every option is announced twice; four nameless images stand in the menu

Computed accessibility tree of the open popover (`probe-P3-7-aria.mjs`, WebKit):

```
- dialog "Filters":
  - text: Sort
  - radiogroup:
    - radio "Newest" [checked]
    - img
    - text: Newest
    - radio "Most Popular"
    - img
    - text: Most Popular
    - radio "Most Forked"
    - img
    - text: Most Forked
  - text: Tier
  - radiogroup:
    - radio "All" [checked]
    - text: All
    - radio "Featured"
    - img
    - text: Featured
  - text: Find by Color
  - 'button "Open color picker, current color #4488cc"'
  - textbox "Search by CSS color":
    - /placeholder: "#hex, hsl(...)"
  - button "Search"
```

Four defects visible in the tree:

1. **Each option's label appears twice** — once as the radio's name (via the wrapping `<label>`) and
   again as a loose `text:` node, because the text is a *sibling* of the control inside the label
   rather than the item's own content. Five options → ten utterances.
2. **Four nameless `img` nodes.** The lucide SVGs (lines 24, 40) carry no `aria-hidden`; the sibling
   sets it (`UserSortMenu.vue:12`).
3. **Both `radiogroup`s are unnamed.** Lines 21 and 33 pass no `aria-label`; the `.section-label`
   divs (lines 20, 32, 48, 63) carry no `id`, so nothing can point at them. `headings: 0`,
   `role="group": 0`, `sectionLabelTags: ["div#-","div#-","div#-"]`.
4. **`Find by Color` is a loose text node** followed by three ungrouped controls.

`DropdownMenuLabel` + `DropdownMenuRadioItem` produce the correct tree by construction.

---

### P3-M9 · MAJOR · **NEW** · Click-outside close drops focus to `<body>` — cross-engine

`VISUAL-CONSTITUTION.md §5.1`, Dialog/Drawer/Popover row: *"producer initial-focus rule on open;
**exact connected opener on close**, otherwise the nearest surviving owning action."*

| close path | engine / scheme | popover closed | focus lands on |
|---|---|---|---|
| `Escape` | WebKit; Chromium light; Chromium dark | yes | **the trigger** (`aria-expanded → "false"`) ✔ |
| click outside | WebKit; Chromium light; Chromium dark | yes | **`<body>`** ✘ |

Half the close contract is met in every engine and scheme I measured. A keyboard user who dismisses
by clicking the page loses their position entirely and must re-traverse the route.

---

### P3-M10 · MAJOR · CONV(D2-M1) · `variant="ghost"` is not a glass-ui 7 prop — the two quietest controls ship at the loudest emphasis

`Button.vue.d.ts`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps … { emphasis?; tone?; size?; iconOnly?; loading?; type?; disabled?; class? }
```

There is no `variant`. Live DOM of both Buttons (`evidence-p3/P3-3-truth.json` → `apiLeak`):

```
trigger : data-emphasis=secondary  data-size=md  data-icon-only=true  variant=ghost  class="… relative h-8 w-8"
clear   : data-emphasis=secondary  data-size=sm                       variant=ghost  class="… h-7 w-full text-small text-muted-foreground"
```

`variant="ghost"` sits on both elements as an **invalid HTML attribute** — the fallthrough that
proves it was never consumed. Both paint `secondary`, the producer default.

The design consequence is the first thing you see in every screenshot: **`Clear all filters` — a
reset, the quietest verb on the surface — is the visually dominant object in the menu.** Hierarchy
exactly inverted. The correct call is `emphasis="quiet"` (or `"text"`), and nobody can discover that
because the wrong one fails silently.

Three more inert calls in the same file:

| call | line | producer truth | measured |
|---|---:|---|---|
| `p-0` on `PopoverContent` | 16 | producer emits `px-(--overlay-pad-inline) py-(--overlay-pad-block)` | computed padding **`20.352px 16px`** — the request lost |
| `h-8 w-8` on the trigger | 5 | `iconOnly` = square geometry | **32.48 × 40.60**, non-square → the badge clip of P3-B3 |
| `variant="ghost"` ×2 | 5, 112 | prop does not exist | leaked as a DOM attribute |

Because `p-0` lost, the local 12 px section padding is **additive** to the producer's 16 px — which
is where 23.3 % of the menu's width goes (§3.1).

---

### P3-M11 · MAJOR · **NEW** · A failed tag catalogue and an empty one render identically — as nothing

`demo/palettes/useTagEdit.ts:40-49`:

```ts
try {
    allTags.value = await getTags();
    loaded.value = true;
} catch {
    // silent — tag catalog is best-effort
} finally { loading.value = false; }
```

with `SearchFilterBar.vue:47`: `v-if="availableTags.length > 0"`.

Observed live: in **all ten** matrices I captured the `Tags` section is absent, and nothing anywhere
indicates that a filter dimension exists but could not be loaded. No loading state (the `loading` ref
is exposed and never consumed here), no empty copy, no retry. "There are no tags" and "the tag
service is down" are the same pixel.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* Here the
failed state is not even colour — it is absence.

*(This is also why the Tags section could not be exercised: the dev server points at the production
API, whose CORS allow-list excludes localhost — the app's own console says so — so `getTags()` never
resolves. The design defect is that the surface reports that as "no tags".)*

---

### P3-M12 · MAJOR · CONV(D2-M7) · Applying a filter announces nothing

`dialog.liveRegions: 0` (`P3-1-register.json`) and `structure.liveRegions: 0` (`P3-6-close.json`).

`VISUAL-CONSTITUTION.md §5.1`, in-route filter row: *"changed result count/state through the owning
status region."* Selecting `Featured` re-queries the wall behind a menu that covers it, with no
status region in the component and no `aria-busy` on the trigger. The only feedback is a badge that
is 49.3 % clipped and absent from the accessible name (P3-B3).

---

### P3-M13 · MAJOR · **NEW** · In forced colors the swatch loses the only thing it says

The swatch's entire content is `:style="{ backgroundColor: pickerHex }"` (line 77). Chromium,
`forcedColors: "active"` (`evidence-p3/P3-3-truth.json`):

| context | `getComputedStyle(swatch).backgroundColor` |
|---|---|
| `chromium-light` | `rgb(68, 136, 204)` |
| **`chromium-forced-colors`** | **`rgb(255, 255, 255)`** |

`forced-color-adjust: auto`, so the UA replaces the author background with `Canvas`. In Windows High
Contrast, "Find by Color" is **a blank white circle**; the hex survives only in the `aria-label`, so
a sighted HCM user has no path to the current search colour at all.

The producer's answer exists: `WatercolorDot` is the sanctioned colour-bearing species, and
`VISUAL-CONSTITUTION.md §4.2` already rules its face to be presentation seated inside a **named
geometric button** — exactly this control's shape, with the hex as text beside it so the value
survives forced colors and monochrome.

*(WebKit does not truly emulate forced-colors, which is why the Chromium arm exists and why pass 2
correctly declined to claim a forced-colors finding. This is the pass-3 addition that closes it.)*

---

### P3-M14 · MAJOR · CONV(D2-M3) · The radio species paints no focus register at all — and four focus vocabularies share one 240 px menu

Chromium, both schemes, tab walk (`evidence-p3/P3-8-chromium.json`):

| species | `outline-style` | `box-shadow` | paints a ring? |
|---|---|---|---|
| `button[role=radio].radio-group__item` (×5) | **`none`** | **`none`** | **NO — light and dark** |
| the hand-rolled swatch (`button.block.h-7`, line 75) | `none` | its ordinary cartoon caster | only its resting shadow |
| `input.field-control` | `none` | producer ring `0 0 0 2px` | yes |
| the hand-rolled Search pill (`button.absolute.right-1`, line 97) | **`auto 1px rgb(185,189,192)`** | `none` | yes — **the user-agent default**, a register that exists nowhere else in this app |

Five of the seven controls in the menu — both radio groups — have **no visible focus state
whatsoever**, in either scheme. `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from
selection in both schemes, forced colors and reduced transparency."*

Two authorship notes: the radio's missing register is a **producer** defect on glass-ui's form
`RadioGroup` and should be relayed to the glass-ui BH inbox; the UA-default outline on the Search
pill is authored here (line 97 carries no `focus-ring` class) and dies with the transposition.

---

### P3-m1 · MINOR · CONV(D-12, D2-m1) · The designed loading state cannot paint

`applyColorSearch` (lines 213-225) is `async` but contains no `await`: `searching.value = true`, the
body runs synchronously, `finally` sets it false — one tick, before Vue can flush. Live proof over 30
`requestAnimationFrame` frames with a `MutationObserver` on the dialog:

```json
{ "sawSpinner": 0, "sawDisabled": 0, "frames": 30, "buttonHTML": "<span data-v-ace91ae4=\"\">Search</span>" }
```

The `Loader2` spinner (line 102), the `disabled` binding (line 98) and four `disabled:` utilities
(line 99) are dead design work. The operation that *is* asynchronous — the parent's refetch of the
wall — has no affordance here at all.

---

### P3-m2 · MINOR · CONV(D-15, D2-M5) · Type roles outside the closed matrix, and a token consumed for the opposite of its name

`VISUAL-CONSTITUTION.md §4` — *"This matrix is closed across all eighteen compositions."*

| site | measured | the matrix says |
|---|---|---|
| section headings (`.section-label`) | Fira Code, 14.384 px, `uppercase`, tracking 1.4384 px = `text-mono-caption` | section heading → `text-heading`, Plus Jakarta Sans; mono-caption is reserved for "value, code, or provenance" |
| count badge (line 9, `text-micro font-bold`) | 11 px, **bold** | **no `text-micro` rung exists**; control copy is specified non-bold |
| inline `Search` commit (line 99, `text-micro`) | 11 px | same rung problem — and it is the **primary action** of its sub-instrument at 67 % of its neighbours' 16.4 px |
| option copy | Plus Jakarta Sans, 16.4 px, weight 400 | ✔ conforms |

`.section-label` is a producer utility (`glass-ui/dist/styles/typography/utilities.css`:
`.section-label { @apply text-mono-caption; … }`), so that row is a **mechanism family** with this
component as one site; the badge and the Search pill are authored here.

Separately, `SearchFilterBar.vue:243` writes `font-family: var(--font-serif)` to obtain a **sans**.
It works only through an aliasing accident that `demo/styles/foundation.css:95-102` documents in its
own words: *"`--font-serif` → --font-stack-text → Jakarta, the body voice — the three-voice law
reserves Fraunces for display rungs only."* Measured: `Plus Jakarta Sans`. The declaration is
simultaneously redundant (the popover already inherits that voice) and load-bearing on a name that
means the opposite: the day the producer repoints `--font-serif` at a real serif, every option in
this menu becomes Fraunces.

---

### P3-m3 · MINOR · **NEW** · Three unrelated vertical spacings in one 240 px surface

`12 px` (`.filter-section`, line 238) · `8 px` (Clear-all row, line 110) · `6 px` (label→group, line
239) — no ratio, no token, no ladder relation, and the last row of the menu breaks the section
padding it sits in. Measured `rhythm`: `12px/12px/12px/12px` ×3 then `8px/12px/8px/12px`.

---

### P3-m4 · MINOR · **NEW** · A control column with three heights, one of them 1.93× short

Desktop 28 / 36 / 36; **mobile 28 / 54**. The swatch is a fixed `h-7 w-7` (line 76) beside a
producer field that scales with the viewport, so the mismatch *widens* as the screen narrows.
Optical centres disagree by 1.0 px.

---

### P3-m5 · MINOR · CONV(D-5, D2-m2) · The colour field cannot show the value it advertises

Field 148 px wide with `padding-right: 64px` (`pr-16`, line 94) → **84 px of usable measure**; the
placeholder renders as `#hex, …`. The reserve is mis-sized too: the pill it reserves for measures
**52.59 px**, leaving **11.41 px** of dead space, and `pr-16` is a magic number tied to the literal
string `"Search"` — any relabelling silently underlaps the text.

For accuracy: `truncate` on the `<input>` is *not* inert — measured `text-overflow: ellipsis;
overflow: hidden; white-space: nowrap` — it is redundant with the element's own defaults for two of
three declarations.

---

### P3-m6 · MINOR · **NEW** · One directory, two icon conventions

`SearchFilterBar.vue:6` — `<EllipsisVertical class="h-4 w-4 text-muted-foreground" />`, no
`aria-hidden`, producing a nameless `img` in the trigger's AT tree.
`UserSortMenu.vue:12` — the same glyph with `aria-hidden="true"`. Same role, same folder, different
contract.

---

### P3-i1 · INFO · The standing visual audit has never seen this component

`audit/visual/REPORT.json`: all four `/#/browse` rows report `probe.counts.dialog: 0`, and
`probe.a11y.smallTapTargets` lists only `PaletteSlugBar` controls. Every open-state frame in this
report — and in passes 1 and 2 — is new. A future "the visual matrix is green for Browse" must be
read as "the matrix photographs Browse with this menu closed".

---

## 6. Negative proofs — nine axes I attacked and could not break

The premise of this seat is that the design is wrong. Where I could not make that stick, the evidence
for the negative is recorded so the budget is not re-spent.

**6.1 Rendered text contrast is sound.** Pixel-measured at 4× through a canvas readback, both schemes
(`evidence-p3/P3-4-pixels.json`):

| ink role | light | dark |
|---|---:|---:|
| section label | 5.67 | 5.05 |
| option text | 13.69 | 7.85 |
| Search pill text | 5.78 | 7.42 |
| Clear-all text | 10.85 | 8.75 |
| field placeholder | 5.60 | 6.02 |
| field value | 14.91 | 9.37 |

Every ink role clears AA at its size in both schemes. The legibility complaint in §2.2 is
interference from the ground *behind* the glass, not ink contrast — a distinction worth keeping,
because raising the ink contrast would not fix it.

**6.2 Reduced motion is honoured — this CORRECTS pass 1 D-16.** Under `reducedMotion: "reduce"` a
77-rule `prefers-reduced-motion` blanket rewrites the surface: `.filter-option` →
`opacity/color/background-color/border-color/box-shadow 0.1s`; the swatch → **`opacity 0.15s` only**;
the popover → `opacity 0.15s allow-discrete` with `scale` and `translate` **removed**;
`animation: 0.00001s`. **No geometry animates under `reduce`.** The surviving 0.15 s is an opacity
transition, which §6 permits ("Reduced motion resolves directly to the final geometry").

**6.3 The component's own motion is tokenized.** `transition: background-color var(--duration-fast)
var(--ease-standard)` (line 246); the bare Tailwind `transition-shadow` / `transition-colors`
utilities resolve to the same house tokens because `demo/styles/foundation.css` aliases
`--default-transition-duration: var(--duration-fast)` and
`--default-transition-timing-function: var(--ease-standard)` at the `@theme` root. Measured `0.2s
cubic-bezier(0.4, 0, 0.2, 1)` throughout. No animation is deleted; none animates a layout-forcing
property (`background-color`, `box-shadow`, `color`, `opacity` only). Edict 6 met.

**6.4 Radio options DO have accessible names.** The wrapping `<label>` (line 22) names each
`[role=radio]`: the AT tree reads `radio "Newest"`, `"Most Popular"`, `"Most Forked"`, `"All"`,
`"Featured"`. The defects are the *duplicate* announcement and the *unnamed group* (P3-M8), not
nameless items.

**6.5 Focus is not lost by Tab — MY OWN CLAIM WITHDRAWN.** A WebKit tab walk showed focus leaving the
open popover after three stops. Chromium — authoritative here per `audit/visual/states.mjs:6-9`,
which records that macOS ships Full Keyboard Access OFF — shows the opposite:
`stillOpenAfter8Tabs: true`, and the walk cycles inside the surface
(`radio → swatch → input → Search → radio → radio → swatch → input`). Every control species is
reachable. **Claim withdrawn; the WebKit reading was an artifact.** This converges with pass 2's
negative #1.

**6.6 `Escape` restores focus to the opener** in WebKit and in Chromium, both schemes
(`focusIsTrigger: true`, `aria-expanded → "false"`). Only the click-outside path fails (P3-M9).

**6.7 No hit-target overlap — my own hypothesis, falsified.** The 44 × 44 radio boxes overflow their
30.94 px rows, so I expected adjacent targets to overlap and mis-route clicks. They do not:
`markerOverlap: −12.93 px` (desktop) / `−9.59 px` (mobile), and a 1 px-step `elementFromPoint` sweep
down the marker column returned `mismatchCount: 0` in every matrix. The 44 × 44 invisible target
around an 18 × 18 visible mark is exactly what `PROPORTION-AUDIT.md §5` law 7 asks for.

**6.8 `.focus-ring` and `.scrollbar-thin` are real classes — hypothesis falsified.** A walk over
every loaded stylesheet rule found `focus-ring: 2` and `scrollbar-thin: 6` matching selectors. Neither
is a dead class.

**6.9 No horizontal overflow, no component-attributable console noise.** `docHorizontalOverflow: 0`
in all 7 matrices; the single console error is the dev server's own `VITE_API_URL` misconfiguration
warning.

---

## 7. Adjudication

| prior claim | pass-3 result |
|---|---|
| D-1 / D2-B1 — tag checkbox inert | **UPHELD**, strengthened to a static proof from the shipped `.d.ts` |
| D-2 / D2-B2 — overflows, no scroller | **UPHELD and EXTENDED**: the mobile/zoom failure is at the **top** (−154 px / −227.5 px), losing `Sort` outright |
| D-11 "the badge is not clipped" vs D2-B3 "clipped" | **D2-B3 UPHELD**; pass 1's negative stays overturned. Pass 3 adds the area measurement: **49.3 % of the chip painted away** |
| D-19 / D2-B4 — colour substitution | **UPHELD**, six inputs; extended: even a *valid* `#FF0000` leaves the swatch on `#4488cc` |
| D2-M1 — five inert API calls | **UPHELD**; pass 3 adds the design consequence (`Clear all filters` becomes the loudest object) and the causal chain from `iconOnly`'s broken square contract to the badge clip |
| D-6 / D2-M3 — the radio species has no focus indicator | **UPHELD** (P3-M14). I initially mis-read WebKit's `outline: none 3px …` as a painted ring; `outline-style: none` paints nothing, and Chromium confirms `paintsAnyRing: false` in both schemes |
| D-16 — "reduced-motion still runs a 0.15 s geometry transition" | **OVERTURNED** (§6.2): under `reduce` only `opacity` survives; `scale`/`translate` are removed |
| D2 negative #1 — "Tab reachability is fine" | **CONFIRMED** (§6.5), and my own contrary WebKit observation withdrawn |
| D2 negative #9 — "forced colors is inconclusive in WebKit" | **CONFIRMED, then CLOSED in Chromium**: the swatch's background is replaced with `Canvas` (P3-M13) |
| D-8 — "16 × 16 tag target beside a 44 × 44 radio" | **UNVERIFIABLE IN THIS ENVIRONMENT** — the Tags section never renders here (P3-M11). Recorded as a hypothesis pending a live catalogue |
| pass-2 D2-M4 "four dividers" vs pass-3 "three" | **BOTH CORRECT**: 4 with the Tags section present, 3 without. The binding answer is `none` either way |
| implicit in both passes — radios are nameless | **CORRECTED** (§6.4): the `<label>` names them; the *groups* are unnamed and the labels are *doubled* |

---

## 8. The cure

Not a patch list. One transposition, which deletes most of the ledger by construction.

**Move the surface onto `DropdownMenu*`, the family its own sibling already uses.**

```
DropdownMenu
  DropdownMenuTrigger as-child → Button icon-only size="xs" emphasis="quiet" aria-label="Filters, N active"
      → Badge (producer) rendered OUTSIDE the trigger's paint-containment box
  DropdownMenuContent align="end" class="w-64 max-h-[min(70svh,32rem)] overflow-y-auto"
      DropdownMenuLabel "Sort"                ← names the group; one rail
      DropdownMenuRadioGroup v-model=sort
        DropdownMenuRadioItem ×3              ← menu rhythm, roving focus, typeahead, one marker lane
      (no DropdownMenuSeparator — OPTICAL-BENCH §5 binds Browse to `none`)
      DropdownMenuLabel "Tier" …
      DropdownMenuLabel "Tags"
        DropdownMenuCheckboxItem v-model ×N   ← the producer's live API; the dead :checked dies
      DropdownMenuLabel "Find by color"
        <WatercolorDot> in a named button + a hex readout + Button size="xs" :loading
```

| defect | disposition after the move |
|---|---|
| P3-B1 tag checkbox inert | **dissolved** — `DropdownMenuCheckboxItem` has one live API |
| P3-B2 no scroller / top overflow | **dissolved** — menu content is a scroll container by contract; keep the `max-h` clamp |
| P3-B3 badge clipped | **dissolved** — producer `Badge` outside `contain: paint`; stop overriding `h-8 w-8` so `iconOnly` keeps its square; put the count in the accessible name |
| P3-B4 colour substitution | **repaired at the call site** — `parseColorIn(text, "oklab")` in a `try`, `aria-invalid` + one `[role=alert]` on failure; `parseColorIn` is already imported (line 145) |
| P3-M2 rails · P3-M3 rhythm · P3-M4 rag | **dissolved** — `DropdownMenuRadioItem` owns one marker lane, one text rail and menu-scale pitch; the icon lane is the item's, so `All` cannot rag |
| P3-M5 dividers | **deleted** (1.57 / 1.40 : 1 — they were never carrying the grouping) |
| P3-M8 doubled labels, nameless imgs, unnamed groups | **dissolved** — `DropdownMenuLabel` names the group; text lives inside the item; add `aria-hidden` to the glyphs |
| P3-M9 close contract | **dissolved** — the producer menu owns close/restore on both paths |
| P3-M10 inert props | **repaired** — `emphasis="quiet"`; delete `variant`, `p-0`, `h-8 w-8` outright, no shims |
| P3-M7 hand-rolled parts | **dissolved** — `Badge`, `Button :loading`, `WatercolorDot` |
| P3-M14 focus registers | **mostly dissolved** — the UA-default outline dies with the hand-rolled Search button; the radio's missing register is a **producer** row and must be relayed to the glass-ui BH inbox |
| P3-M1 two grounds | **mitigated by size, cured by material** — a menu that fits does not hang off its plate; and the *specimen* still needs an opaque neutral well (`§2`), because a colour cannot be read on a `saturate(1.6)` backdrop over a live aurora |
| P3-M6 opposed caster | **deleted** — no cartoon caster on a control seated on glass (§2 instrument veil: "no drop shadow") |
| P3-M11 silent catalogue failure | **needs a decision** — `useTagEdit` must surface `loading`/`error`; the section must render an explicit empty or failed state |
| P3-M12 no status region | **needs a decision** — one polite status owned by `BrowsePane` announcing the result count on filter change (§5.1) |
| P3-M13 forced-colors swatch | **repaired** — render the hex as text beside the face; a colour value must not be conveyed by `background-color` alone (§4.1) |
| P3-m1 dead loading state | **dissolved** — `Button :loading` bound to the parent's real in-flight flag |

Size estimate after transposition, calibrated on `UserSortMenu.vue` (58 lines for one radio group):
roughly **90–110 lines** for four groups plus the colour sub-instrument, against 249 today — and with
zero scoped CSS, because rails, rhythm, marker lane and hover chip all come from the producer.

Two items survive the move as genuine product decisions, not implementation defects:

- **The god-menu question.** `Sort` is not a filter — `activeFilterCount` (lines 189-195) excludes it,
  so the component knows — yet it is hidden behind a badge that counts filters and a glyph (`⋮`) that
  means "overflow". Sort belongs on the bar. This is the same judgement `PROPORTION-AUDIT.md` PR-16
  makes about the Dock's unlabelled vertical ellipsis.
- **Where colour search runs.** The field says "the commons"; the parent filters what is loaded. Out
  of scope for this seat, recorded so the cure above does not entrench it.

---

## 9. Ledger

| id | sev | status | one line |
|---|---|---|---|
| P3-B1 | BLOCKER | CONV | `:checked`/`@update:checked` are not glass-ui 7 API — the Tags filter is decorative; proved from `Checkbox.vue.d.ts` |
| P3-B2 | BLOCKER | CONV+EXT | no scroller in 7/7 matrices; **mobile `y=−154` (29 %), zoom-200 `y=−227.5` (45.4 %) — `Sort` unreachable** |
| P3-B3 | BLOCKER | CONV/CORR | badge clipped to **49.3 % of its area**, digit absent, 1-of-3 hit points in 7/7; cause = `iconOnly`'s square contract broken to 32.48 × 40.60 + `contain: paint`; count also absent from the accessible name |
| P3-B4 | BLOCKER | CONV | 6 colour syntaxes incl. the placeholder's own `hsl(...)` **and a valid `#FF0000`** → searched `#4488cc`, badge "1", zero error affordance |
| P3-M1 | MAJOR | **NEW** | 29.4 % of the menu hangs off the card; its own ground steps **ΔRGB 71.6** (1.47 : 1) with the seam through `FIND BY COLOR`; the colour specimen has no well |
| P3-M2 | MAJOR | **NEW** | **seven left rails** in a 206 px column; 68 px of spread; option text starts 85 px (35.4 %) into a 240 px menu |
| P3-M3 | MAJOR | **NEW** | proximity inverted **4.33×** (26 px between siblings vs 6 px to their heading) — glass-ui's **form** `.radio-group` `gap: 26px` in a menu |
| P3-M4 | MAJOR | **NEW** | `All` rags **22 px** from `Featured` inside one radio group — unreserved icon lane |
| P3-M5 | MAJOR | CONV+EXT | 3 rendered dividers (4 with tags) where `OPTICAL-BENCH-COMPOSITIONS.md:69-90` binds Browse to `none` — **and they measure 1.57 : 1 / 1.40 : 1**, forbidden *and* invisible |
| P3-M6 | MAJOR | **NEW** | swatch caster `−2/−3/−4 px` (down-left) against the live Card's `8px 8px` (down-right) — two light sources in one frame; the only shadow inside a glass popover |
| P3-M7 | MAJOR | CONV | hand-rolls `DropdownMenu*`, `Badge` (class list transcribed from `VARIANT.default`) and `Button :loading` — all three already re-exported in `demo/ui/` |
| P3-M8 | MAJOR | **NEW** | AT tree: every option announced **twice**, 4 nameless `img` nodes, 2 unnamed `radiogroup`s, 0 headings, 0 `role=group` |
| P3-M9 | MAJOR | **NEW** | click-outside close drops focus to `<body>` in WebKit **and** Chromium, both schemes; Escape is correct — §5.1 half-met |
| P3-M10 | MAJOR | CONV | `variant="ghost"` ×2 leaked as a DOM attribute; both buttons paint `data-emphasis=secondary` → `Clear all filters` is the loudest object in the menu; `p-0` lost to `20.352px 16px` |
| P3-M11 | MAJOR | **NEW** | `useTagEdit.ts:46-48` swallows the catalogue failure; "no tags" and "tags failed" are the same pixel in 10/10 matrices |
| P3-M12 | MAJOR | CONV | `liveRegions: 0` — a filter change announces nothing |
| P3-M13 | MAJOR | **NEW** | forced colors (Chromium): swatch `background-color` → `rgb(255,255,255)`; the colour is conveyed by background alone |
| P3-M14 | MAJOR | CONV | 5 of 7 controls (both radio groups) paint **no focus register at all**, light and dark, Chromium-confirmed; 4 focus vocabularies incl. the UA default on the hand-rolled Search button |
| P3-m1 | MINOR | CONV | `searching` cannot paint — `sawSpinner: 0, sawDisabled: 0` over 30 rAF |
| P3-m2 | MINOR | CONV | `text-micro` ×2 (11 px, one **bold**) outside the closed matrix; section headings in the mono value/provenance rung; `--font-serif` consumed to obtain a sans |
| P3-m3 | MINOR | **NEW** | three unrelated vertical spacings (6 / 8 / 12 px), no ladder; the last row breaks its own section padding |
| P3-m4 | MINOR | **NEW** | control heights 28 / 36 / 36 desktop and **28 / 54 mobile** (1.93× fork); optical centres 1.0 px apart |
| P3-m5 | MINOR | CONV | 148 px field, 64 px reserve → 84 px measure; placeholder truncates to `#hex, …`; reserve 11.41 px larger than the pill it reserves for |
| P3-m6 | MINOR | **NEW** | trigger glyph lacks `aria-hidden` while the sibling in the same folder sets it |
| P3-i1 | INFO | **NEW** | the standing Safari matrix photographs `/#/browse` with `counts.dialog: 0` — 107 of 125 template lines unphotographed |

**Strongest single defect: P3-B2.** At mobile and at 200 % zoom the menu renders 29 % / 45.4 % of its
body above the viewport with `overflow-y: visible` and no scroll container anywhere in the chain, so
`Sort` — the first control in the menu — cannot be reached at all.

---

## 10. Files

All paths absolute.

**Reports**
- `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/SearchFilterBar/challenge-D-design.md` (this file)
- `…/SearchFilterBar/challenge-D-design-pass2-c654824e.md` (preserved)
- `…/SearchFilterBar/challenge-D-design-pass2-hydrated-payload.md` (preserved)
- `…/SearchFilterBar/challenge-D-design-pass1-c654824e.md` (preserved)

**Probes** (all under `…/audit/components/SearchFilterBar/`)
- `probe-P3-1-register.mjs` · `probe-P3-2-states.mjs` · `probe-P3-3-truth.mjs` ·
  `probe-P3-4-pixels.mjs` · `probe-P3-5-rails.mjs` · `probe-P3-6-close.mjs` ·
  `probe-P3-7-aria.mjs` · `probe-P3-8-chromium.mjs`

**Measurements**
- `evidence-p3/P3-1-register.json` · `P3-2-states.json` · `P3-3-truth.json` · `P3-4-pixels.json` ·
  `P3-5-rails.json` · `P3-6-close.json` · `P3-8-chromium.json`

**Frames** (`shots-p3/`)
- `P3-px-light-popover.png` — the 4× frame that carries §3 entire
- `P3-px-light-badge.png`, `P3-px-dark-badge.png` — the clipped badge
- `P3-tall-mobile-open.png`, `P3-tall-zoom200-open.png` — the top-overflow blockers
- `P3-desktop-light-open.png`, `P3-desktop-dark-open.png` — the read-through
- `P3-tall-forced-colors-open.png`, `P3-tall-rtl-open.png`, `P3-tall-reduced-motion-open.png`,
  plus the `-closed` counterpart of each matrix

**Read-only sources cited**
- `demo/palettes/browser/search/SearchFilterBar.vue` (subject) · `UserSortMenu.vue`
  (counter-example) · `demo/palettes/BrowsePane.vue` · `demo/palettes/useTagEdit.ts` ·
  `demo/styles/foundation.css`, `utils.css`
- `node_modules/@mkbabb/glass-ui/dist/components/{button,checkbox,badge}/*.d.ts`,
  `dist/styles/typography/utilities.css`
- `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`,
  `OPTICAL-BENCH-COMPOSITIONS.md`
- `docs/tranches/V/megatranche/audit/visual/REPORT.json`, `audit/visual/states.mjs`

**No source file was modified. Nothing was written outside
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/`.**

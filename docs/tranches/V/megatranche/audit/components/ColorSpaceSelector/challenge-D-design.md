# CHALLENGE-D — ColorSpaceSelector: the design is wrong

**Seat:** CHALLENGE-D (design), mega-tranche per-component audit
**Subject:** `demo/color-session/ColorSpaceSelector.vue` (311 lines, area core)
**Base:** branch `tranche-u`, HEAD `c654824e`, glass-ui `7.0.0`
**Date:** 2026-07-28

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. The declaration is honoured; no inherited or undeclared seat.

## Verdict

**DEFECTIVE.** Three BLOCKERs, seven MAJORs, five MINORs. The component's premise —
"TITLE-AS-COMPONENT … the space name is the plate TITLE" (`ColorSpaceSelector.vue:2-6`) — is
executed with a *local* type scale, a *local* focus register, a *local* selection marker and a
*local* specimen grammar, each of which the tranche canon explicitly forbids and names by
component. The two canon rows that mention `ColorSpaceSelector` by name
(`VISUAL-CONSTITUTION.md:90`, `PROPORTION-AUDIT.md:79`) are both violated verbatim at HEAD.

The single most damning result: **in forced-colors mode the trigger's rest, hover and focus
renderings are byte-identical across 96,000 pixels.** Not "low contrast" — identical.

---

## Evidence instruments

| ID | What | Command / artifact |
|---|---|---|
| P1 | WebKit telemetry, 12 arms (1440/390/320/720 × light/dark × closed/open/PRM/forced) | `probe-D.mjs` → 129 KB JSON |
| P2 | Chromium forced-colors focus telemetry | `probe-D2.mjs` |
| P3 | Chromium forced-colors **state-delta** capture (rest/hover/focus) | `probe-D3.mjs` → `D-state-{fc,nc}-{rest,hover,focus}.png` |
| P4 | Focus-ring rendered-contrast sweep, 2 schemes × 2 hosts | `probe-D4.mjs` → `D-ring-*.png` |
| P5 | Space-change chassis-reflow measurement | inline WebKit script (output pasted below) |
| P6 | Tracked Safari matrix | `../../visual/shots/{safari-desktop,safari-mobile}-{light,dark}/picker.png`, `zoom-200-desktop/picker.png`, `rtl-desktop/picker.png` |

All probe scripts are committed beside this report. The dev server was live at
`http://127.0.0.1:9000` throughout; nothing under `src/`, `demo/`, `test/` or `e2e/` was touched.

---

# BLOCKERS

## D-1 — In forced-colors mode the trigger has **zero** state delta. Rest = hover = focus, pixel for pixel.

**Law.** `VISUAL-CONSTITUTION.md:84` — "Focus remains visibly distinct from selection in both
schemes, **forced colors** and reduced transparency." `VISUAL-CONSTITUTION.md:90` (the
`ColorSpaceSelector` row) — "…**focus has its own independent nonzero delta**."

**Mechanism.** `ColorSpaceSelector.vue:276-280`:

```css
.space-trigger:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-md);
}
```

`outline: none` deletes the UA fallback; `box-shadow` is the sole indicator. CSS Color Adjust
Level 1 §3.2 specifies that under `forced-color-adjust: auto` the UA sets `box-shadow: none`.
Separately, the rest-state "invisible" underline at `:249-255`
(`text-decoration-color: transparent`) is *painted* as CanvasText in forced colors, so the hover
delta is consumed before hover ever fires.

**Reproduction** — `node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D3.mjs`
(Chromium, `emulateMedia({forcedColors:"active"})`, 1440×900 dark, DPR 2, clip on the trigger):

```
FORCED-COLORS   rest->hover  maxChannelDelta=  0  pixelsChanged(>4/255)=     0/96000 (0.00%)
FORCED-COLORS   rest->focus  maxChannelDelta=  0  pixelsChanged(>4/255)=     0/96000 (0.00%)
FORCED-COLORS   hover->focus maxChannelDelta=  0  pixelsChanged(>4/255)=     0/96000 (0.00%)

NORMAL dark     rest->hover  maxChannelDelta=161  pixelsChanged(>4/255)=  5001/96000 (5.21%)
NORMAL dark     rest->focus  maxChannelDelta= 56  pixelsChanged(>4/255)=  5261/96000 (5.48%)
NORMAL dark     hover->focus maxChannelDelta=161  pixelsChanged(>4/255)= 10262/96000 (10.69%)
```

The identical clip registers 5–11 % change in the normal path, so the clip is correct and the
forced-colors zero is real. Computed styles agree (`probe-D3.mjs` output): under forced colors
`triggerBoxShadow: "none"`, `triggerOutlineStyle: "none"`, `triggerColor: "rgb(255,255,255)"` at
rest **and** at focus.

**Frame:** `D-focus-forcedcolors.png` — keyboard-focused trigger, no ring of any kind.

**Cure (gestalt, not patch).** Delete `:276-280` entirely. Focus on a `SelectTrigger` is the
producer's job (owner edict 5: style at the root, never per-instance). If glass-ui 7.0.0's
`SelectTrigger` focus register is itself box-shadow-only, the fix is a glass-ui `outline`-based
focus primitive (edict 4) relayed to the BH inbox — **not** a second consumer override. An
`outline` survives forced colors by spec; a `box-shadow` cannot.

---

## D-2 — `hide-indicator` is still shipped, and the *only* selection marker is an opacity step on the WatercolorDot face — the exact mechanism V abrogates.

**Law, twice, by name.**

`PROPORTION-AUDIT.md:79` — "ColorSpaceSelector **deletes `hide-indicator`** and consumes the sole
producer `SelectItem` indicator/gutter. Exactly one marker agrees with the option and
`aria-selected`; … **WatercolorDot face delta is `0`**, and local pill/halo/pseudo markers are
absent."

`VISUAL-CONSTITUTION.md:90` — "It deletes `hide-indicator` and may not add a local pill, halo,
pseudo-element, marker, or Card/face selected variant. … the **WatercolorDot face delta remains
`0`**."

`VISUAL-CONSTITUTION.md:91` — "V **abrogates a selection outline and interactive host on
`WatercolorDot`** … the organic face supplies color/specimen identity only. Selection …
belong[s] to a named enclosing geometric button/seat."

`VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn and disabled states are
**never color-only**."

**Shipped.** `ColorSpaceSelector.vue:63` `hide-indicator`; `:84-85`
`:class="modelValue === space ? '' : 'specimen-dot-idle'"`; `:287-289`
`.specimen-dot-idle { opacity: 0.35 }`. The component's own comment at `:73-75` states the intent
outright: *"selection speaks through the specimen dot's idle-opacity step."*

**Measured** (P1, all 8 open arms, 18 options each — WebKit 1440/390/720, light/dark/PRM/forced):

```
wk-1440-light-open  options=18  gutterPresent=0   idleDotOpacities=["0.35","1"]
wk-1440-dark-open   options=18  gutterPresent=0   idleDotOpacities=["0.35","1"]
wk-390-light-open   options=18  gutterPresent=0   idleDotOpacities=["0.35","1"]
wk-2880-zoom200     options=18  gutterPresent=0   idleDotOpacities=["0.35","1"]
selected=[{"t":"Lab","ds":"checked","dot":"1","cls":"specimen-dot shrink-0 watercolor-swatch"}]
```

`gutterPresent = 0` in **144/144** rendered options. The producer gutter exists and is being
thrown away — `node_modules/@mkbabb/glass-ui/dist/select-BcBAyLXA.js:244-246,272,281-285` ships an
`aria-hidden` indicator span at `absolute left-2 h-3.5 w-3.5` containing a
`w-2 h-2 rounded-pill` dot coloured from `--select-dot-color, var(--glass-accent, currentColor)`,
suppressed exactly when `hideIndicator` is set.

Measured WatercolorDot face delta = **0.65 opacity** (0.35 → 1.00). The law says **0**.

Marker count is also wrong. `probe-D.mjs` shows the *selected* row is simultaneously the only
`data-highlighted` row on open:

```
[{"t":"Lab","sel":"true","ds":"checked","hl":true,"dot":"1"}, … 17 × {"sel":"false","hl":false,"dot":"0.35"}]
```

so on open, **selection and focus are visually fused into one pill** (`D-open-1440-light.png`,
`crop` at 4th row). Arrow away and the pill leaves; the only surviving selection signal is a
0.65 opacity step on an organic blob that is *the same colour in all 18 rows*.

**Cure.** Delete `hide-indicator` (`:63`), delete `.specimen-dot-idle` (`:85`, `:287-289`), let
the producer indicator own the marker in its own gutter, and re-tune `pl-3` (`:65`) to clear the
producer's `left-2 + w-3.5` gutter (22 px; the current 12 px collides). The dot then does what
§4.2 says it may do — depict colour — and nothing else.

---

## D-3 — The specimen catalog, which is the component's whole reason to exist, is illegible, truncated in 16/18 rows, and factually wrong.

This is the strongest *design* defect: every one of the catalog's three promises fails at once.

### (a) It is illegible — the headline bleeds through the panel and collides with the caption

`SelectContent align="start"` (`:58`) anchors a 302 × 384 glass panel directly over the numeric
readout. The readout is legible **through** the panel and interleaves with the first option's
caption.

**Frames:** `D-open-1440-light.png`, `D-open-1440-dark.png` (full page),
`crop-dark` at 604 × 768 (below, reproduced in the artifacts). In dark, `hsl(346.045357898758d…`
and the ghost `92.0%, 88.8,` occupy the same pixels at the same luminance. On mobile
(`D-open-390-light.png`) the collision is worse: `20.0` sits inside `HSL`, and the *first row's
name is clipped away entirely* — the user sees a caption with no label.

`VISUAL-CONSTITUTION.md:19` — "Glass earns its blur by revealing live content; otherwise it is a
neutral well." Here the glass reveals *the content the panel is supposed to let you change*, and
the two fight.

### (b) It is truncated in 16 of 18 rows

`:80` `max-w-[16rem]` + `:89` `truncate`, inside a 302 px panel. Measured
`[scrollWidth, clientWidth]` per row (P1, 1440 light):

```
638,234  rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)
720,234  hsl(346.045357898758deg -1295.152156124318% 103.662622110611% / 82.7%)
679,234  hwb(346.045357898758deg 56.226092874351% -51.09915134687% / 82.7%)
731,234  color(srgb-linear 2.580409706575 0.276260750926 0.575271696508 / 82.7%)
741,234  color(prophoto-rgb 1.270097960811 0.688918884826 0.734567553273 / 82.7%)
…
truncatedCaptions = 16/18 (desktop) · 15/18 (390 and 720)
```

Worst case **234 / 741 = 32 %** of the string is shown. The rendered result is
`hsl(346.045357898758d…` — 16 of the 22 visible characters are spent on a single meaningless
fractional hue, and the second and third channels are never reached. The "live per-space
conversion" the component promises at `:56-57` is not delivered in 16 of 18 rows.

### (c) It is factually wrong, and internally contradictory

The captions are the raw serializer output, unclamped and unrounded:

- `rgb(385.302835934518 …)` — an R channel of **385** on a 0–255 axis.
- `hsl(… -1295.152156124318% 103.662622110611% …)` — a saturation of **−1295 %**.
- Three rows later, `#ff8fc8d3` — i.e. R = 255. The same catalog states the same colour's red
  channel as 385 and as 255, three rows apart.

The component authors **two incompatible grammars** in one list (`:154-166`): the CSS branch
(`:161`) returns `serializePickerColor` verbatim at full float precision, while the non-CSS
branch (`:162-164`) rounds to `toFixed(4)` and joins with ` · `. Rendered result — three
notations in one 18-row list:

```
lab(92% 88.8 20 / 82.7%)         ← CSS function form, full precision
hsv · 346.0454 · 0.6279 · 1.511  ← middot form, 4 dp
#ff8fc8d3                        ← hex form
```

`VISUAL-CONSTITUTION.md:76` closes the value role to `text-mono-small`/`mono-caption`; it does
not licence three grammars. `PROPORTION-AUDIT.md:73` — "Real rendered relation wins over token
intent."

### (d) You can see 4 of 18

Row height 80.7 px (desktop) / 77.4 px (mobile); `content.maxHeight = 384px`, `overflowY:hidden`
with two 24 px chevron scroll buttons. **4 rows of 18 are fully visible (22 %)**; at the 720 px
zoom arm `maxHeight` falls to 253.5 px → 3 rows (17 %). The only signal that 14 more colour
spaces exist is a 12 px chevron.

**Cure.** The catalog is not a dropdown; it is a *comparison table* of 18 specimens. Give the
name its legislated `text-small` rung (D-9), give the caption a canonical, gamut-clipped,
fixed-precision spelling (one grammar — the `PALETTE-CONTRACT.md:226` canonical spelling already
exists in this repo), and let the row breathe horizontally instead of vertically: at
`text-small`, 18 rows at ~40 px fit in 720 px, and a 420 px-wide panel ends the truncation. If the
panel must stay 384 px tall, it must not sit on the readout — anchor it below the header band or
promote it to a sheet on mobile (`VISUAL-CONSTITUTION.md:32`: mobile is "one document-scrolling
stage→inspector→action sequence", not a 35 %-of-viewport popover over the stage).

---

# MAJOR

## D-4 — The P019 paired-clamp law is not implemented. The identity/headline ratio drifts from 0.729 to 0.975 and is 0.975 at the desktop reference viewport.

**Law.** `VISUAL-CONSTITUTION.md:62` — "BI P019 supplies a paired clamp whose complete rendered
ratio is `1/√φ`; **independently clamped display-2/display-3 tokens and a local approximation are
forbidden**." `PROPORTION-AUDIT.md:46` (PR-02) — "`Lab` competes typographically with numeric
specimen → **TIGHTEN** … Family-neutral paired sizes at `1/√φ`."

**Shipped.** Two *different scaling bases*:

- identity — `ColorSpaceSelector.vue:209` `font-size: var(--type-display-2)` =
  `clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` → **viewport-driven**
- headline — `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue:136-139`
  `font-size: calc(min(var(--type-display-4), max(11.65cqi, 2.618rem)) * var(--readout-fit, 1))`
  → **container-driven, times a runtime JS factor**

A fixed ratio between a `vw` clamp and a `cqi` expression is structurally impossible.

**Measured** (P1 + P5; `1/√φ = 0.786151`):

| arm | identity | headline | ratio | error vs law |
|---|---:|---:|---:|---:|
| 1440 × 900 | 53.280 px | 54.646 px | **0.9750** | **+24.0 %** |
| 720 × 450 | 39.840 px | 54.646 px | **0.7290** | −7.3 % |
| 390 × 844 | 32.928 px | 41.888 px | 0.7861 | +0.0 % |
| 320 × 700 | 32.928 px | 41.888 px | 0.7861 | +0.0 % |

The law holds at the floor arm only — because `2.058rem / 2.618rem` happens to equal `1/√φ`. At
the *ceiling* arm, which is the desktop reference viewport in every tracked capture, the "one
adjacent golden rung smaller" identity is **97.5 % of the headline**. Confirmed stable across five
colour spaces at 1440 (P5): `Lab · OKLCh · ProPhoto RGB · Hex · Kelvin` all report
`ratio=0.9750 err=24.0%`.

Look at `../../visual/shots/safari-desktop-light/picker.png`: "Lab" and "92.0%, 88.8, 20.0" read
as the same optical weight. The Fraunces italic is *heavier* in colour than the Fira numerals, so
optically the label wins. PR-02's TIGHTEN was never delivered; only the T-51 one-rung step-down
(`:200-208`) landed, and it moved the wrong arm.

**Cure.** One clamp, one base. Either both arms consume `cqi` from the same container, or the
producer ships the P019 paired token and both consume it. Two independent clamps cannot be
patched into agreement.

## D-5 — The focus ring measures 1.76 – 2.09 : 1 against its own plate, in *every* arm, including the ordinary rendering path.

WCAG 2.2 SC 1.4.11 (Non-text Contrast) floor is **3.00 : 1**.
`VISUAL-CONSTITUTION.md:82` — "Text, focus, boundaries and state meet their **rendered** contrast
on the actual material tier; a token name is not evidence."

**Measured** (P4 — rest/focus screenshot pairs, ring = median of the 500 largest-delta pixels,
ground = the same pixels at rest, WCAG relative luminance):

```
dark-default        ring=[168 130 151]  plate=[122  74 105]  FOCUS-RING CONTRAST = 2.09:1
light-default       ring=[217 118 164]  plate=[244 181 217]  FOCUS-RING CONTRAST = 1.76:1
light-default-about ring=[218 139 163]  plate=[246 214 215]  FOCUS-RING CONTRAST = 1.89:1
```

Root: `--focus-ring-shadow` = `0 0 0 2px color-mix(in srgb, <accent> 30%, transparent), 0 0 8px
color-mix(…, 15%, transparent)` (P2). A 30 %-alpha ring cannot reach 3:1 against a mid-lightness
ground by construction, and `demo/styles/foundation.css:263` re-points `--focus-ring-color` at
`--accent-live` — **the live picked colour** — so the indicator's contrast is a free variable of
the user's data, not a design decision.

`D-focus-normal.png` also shows the ring is optically wrong: an 111.5 × 85 rounded rect around
~53 px of ink, with ~25 px of headroom above the cap-height and ~10 px below the descender —
asymmetric by construction, because `h-fit` measures the line box and `:224` adds
`padding: 0 0 0.095em` on the bottom only. `PROPORTION-AUDIT.md:56` (PR-12) — "Touch padding
bloats/misaligns visual glyphs"; `:72` — "Visual glyph size, operable target size and layout
reservation are separate quantities."

The component's own comment at `:273-275` asserts "the ring must stay visible". It is not
verified, and it is false in one of the two modes it must hold in (D-1).

## D-6 — Selecting a colour space reflows the picker chassis by 61.2 px.

**Law.** `VISUAL-CONSTITUTION.md:78` — "Live numbers use tabular figures and **reserve their
widest legal representation so value changes never reflow the settled chassis**."
`VISUAL-CONSTITUTION.md:30` — "Expanded/collapsed/mounted states do not move the scene below it."
`PROPORTION-AUDIT.md:19` — "The locked chassis does not grow for paint or values."
`VISUAL-CONSTITUTION.md:98` — "Selection changes the active specimen **without committing it**."

**Reproduction** (P5, WebKit 1440 × 900, drive the component's own dropdown):

```
{"s":"Lab",          "rr":{"h":122.4},"headerH":226.5,"lines":"2"}
{"s":"OKLCh",        "rr":{"h":122.4},"headerH":226.5,"lines":"2"}
{"s":"ProPhoto RGB", "rr":{"h": 61.2},"headerH":165.3,"lines":"1"}
{"s":"Hex",          "rr":{"h": 61.2},"headerH":165.3,"lines":"1"}
{"s":"Kelvin",       "rr":{"h": 61.2},"headerH":165.3,"lines":"1"}
```

Header height **226.5 → 165.3 px**: a 61.2 px jump of the spectrum canvas and every slider below
it, caused by the one control the user is looking at. And for `Lab`/`OKLCh` the readout box is
122.4 px = two lines while the ink occupies one — the *blank first line* is visible in
`safari-desktop-light/picker.png` (readout `<h3>` top y = 252.6, first `.readout-cell` ink top
y = 313.8; **61.2 px of reserved emptiness**). PR-01's "unconditional two-line/bottom-aligned
readout" (`PROPORTION-AUDIT.md:11,45`) is still shipping at HEAD.

Mechanism owner is `readoutReservation.ts` / W20, **not** this file — but this component is the
sole trigger, and its design gives the user no signal that changing a space will resize the
instrument. The `zoom-200-desktop/picker.png` frame makes the consequence plain: an enormous
unowned void between "Lab" and the numerals.

## D-7 — Two comboboxes with the identical accessible name "Select color space" on one route, driving one piece of state.

**Measured** (P1, every desktop arm): `triggerCount: 2`. Both `role="combobox"`, both
`aria-label="Select color space"` (`:43`), both bound to `model.selectedColorSpace`.

Hosts: `demo/picker/ColorPicker.vue:39` (plate title, 53.28 px) and
`demo/scenes/about/AboutPane.vue:20` (inline, 41.89 px). Both render on `/#/` — see
`safari-desktop-light/picker.png`: "Lab" top-left **and** "About the color spaces, *Lab*"
top-right, both operable, both with the same name.

**Law.** `PROPORTION-AUDIT.md:50` (PR-06) — "Three adjacent action species or duplicated selected
fills → **REMOVE**. One action/selection owner." `VISUAL-CONSTITUTION.md:58` — "About is a quiet
trailing destination **rather than Picker's companion**"; the member-route inventory names
`/about`.

**Root cause is compositional, not local.** `demo/color-picker/router/index.ts:22-37` has **no
`/about` route** — About ships as Picker's companion pane, exactly the composition
`VISUAL-CONSTITUTION.md:44,58` abrogates. The duplicate combobox is a symptom. It also means the
`inline` host has **zero coverage in the tracked visual matrix**: the 15 captured routes
(`../../visual/REPORT.md:119-178`) contain no `/#/about`, so no matrix arm ever exercises the
`inline` branch on its own terms.

## D-8 — Six consumer overrides that defeat glass-ui internals; one of them cites a producer defect that glass-ui 7.0.0 has already fixed.

Owner edict 4 ("glass-ui is the design system; variants/primitives belong in glass-ui") and
edict 5 ("style at the root, never per-instance overrides"). The component reaches into producer
DOM in six places:

| # | Site | Producer thing it defeats |
|---|---|---|
| 1 | `:48` `[&>span]:overflow-visible [&>span]:line-clamp-none [&>span]:block [&_svg]:translate-y-[0.06em]` | `SelectTrigger`'s label/`svg` layout |
| 2 | `:224` `padding: 0 0 0.095em` | the producer's `px-3 py-2` control padding (self-documented at `:219-223`) |
| 3 | `:239-242` `.space-trigger :deep(svg) { width/height: 0.382em }` | the producer chevron's `h-4 w-4` |
| 4 | `:249-255` `.space-trigger > :deep(span) { text-decoration… }` | reka's cloned `SelectValue` node |
| 5 | `:65` `class="pl-3 pr-4 py-2"` | `SelectItem`'s own padding |
| 6 | `:300-302` `.specimen-name { font-weight: var(--type-weight-display) }` | `text-title`'s weight |

Three of these carry a "BOOKED SWAP" comment — the component knowingly ships a consumer patch
awaiting a producer cure. **One of those cures has landed and the patch did not retire.**
`:291-299` states: *"glass-ui's `text-title` @utility hardcodes `font-weight: 700`
(semantic.css:132) — a UTILITY hardcode, not a token."* At the installed glass-ui 7.0.0:

```
$ grep -o 'text-title { [^}]*}' node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css
text-title { font-family: var(--font-text); font-size: var(--type-title);
             line-height: var(--type-leading-heading); letter-spacing: var(--type-tracking-tight);
             font-weight: var(--type-weight-title); text-wrap: balance; }
```

It is a **token** (`--type-weight-title: 700`), not a hardcode. The stated justification is false
against the shipped producer; the root-level cure (re-point `--type-weight-title`, or stop using
a *title* utility for a dropdown option at all — D-9) is available and unused. Edict 2 (no legacy
code, no dual paths) applies.

Also: `:45` passes `size="default"` to the producer and `:209` then overrides `font-size`
outright. The component declares a size station to glass-ui and immediately ignores it.

## D-9 — Dropdown option type is 2.01× the legislated size and the wrong family.

**Law.** `VISUAL-CONSTITUTION.md:75` — "control or label, **including dropdown options** →
`text-small` | Plus Jakarta Sans, non-bold." `PROPORTION-AUDIT.md:15` — "Dropdown options remain
Plus Jakarta Sans `text-small` control copy and non-bold." `VISUAL-CONSTITUTION.md:78` — "This
matrix is **closed** across all eighteen compositions."

**Shipped.** `:76-78` `class="specimen-name font-display italic text-title leading-tight"`.

**Measured** (P1, every arm): `nameFontSize: 32.928001px`, `nameFamily: "Fraunces"`,
`nameWeight: 400`. `--type-title: 2.058rem` = 32.928 px;
`--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` = **16.4 px @1440**.

**32.928 / 16.4 = 2.01×**, in the display family, italic. The rendered result
(`crop-dark`, `D-open-390-light.png`) is a stack of headlines, not a control list — which is why
only 4 of 18 fit (D-3d).

The class list also stacks two conflicting family utilities (`font-display` **and** `text-title`,
which sets `font-family: var(--font-text)`) and relies on cascade order to pick a winner. That is
not a design decision; it is an accident that currently resolves the way the author wanted.

## D-10 — The host reaches into the component and replaces its transition with a layout-forcing `font-size` animation.

`demo/picker/header.css:95-102`:

```css
.picker-header .space-trigger {
    transition:
        color var(--duration-fast) var(--ease-standard),
        font-size var(--duration-normal) var(--ease-standard);
}
.picker-header.is-condensed .space-trigger { font-size: var(--type-display-1); }
```

Measured (P1): the picker instance reports `transition: "color, font-size / 0.2s, 0.3s"`; the
About instance reports `"color / 0.2s"`. The component's own `:192`
`transition: color var(--duration-fast) var(--ease-standard)` is silently clobbered in its primary
host — `.picker-header .space-trigger` (0,2,0) beats `.space-trigger` (0,1,0), both unlayered.

**`font-size` forces layout on every animated frame.** The 300 ms transition reflows the header
band and everything below it in the scrolling Card on each frame (~18 full layout passes at
60 fps). `header.css:31-33` claims *"Bounded 300ms reflow at the crossing, ZERO per-frame reflow
during scroll"* — the second clause is true, the first is not: a `font-size` transition reflows
per frame for the whole 300 ms, not once.

This is edict 5 inverted: instead of the component styling at the root, the *host* per-instance-
overrides the component. The cure is a discrete rung swap (no transition on `font-size`) or a
producer-owned condensed size station — the readout already does exactly this and says so at
`header.css:109-115`.

---

# MINOR

## D-11 — The component's documented reduced-motion behaviour is false.

`:186-188` claims: *"Reduced motion: the global PRM guard (animations.css) neutralises these
transition durations; states still land instantly as ink."*

Measured under `reducedMotion: "reduce"` (P1, `wk-1440-prm`): `transition: "opacity / 0.15s"`.
Not neutralised — **replaced**. `demo/styles/animations.css:202-212` carves out
`[data-state="open"], [data-state="closed"]` with `transition-property: opacity !important;
transition-duration: 150ms !important`, and the `SelectTrigger` carries `data-state="closed"` at
rest. A carve-out written for Dialog/Sheet/Popover overlays silently governs a text control's
motion, and `header.css:136-143`'s own PRM guard (duration-only) is dead in the water. The
component has no PRM contract of its own; whichever global sheet sorts last wins.

## D-12 — Eleven minted literals in a component whose thesis is that the token ladder is the sizing authority.

`:191` `86%` · `:216` `0.19em` · `:224` `0.095em` · `:240-241` `0.382em` ×2 · `:251-252`
`0.024em`, `0.072em` · `:283-284` `0.875rem` ×2 · `:288` `0.35` · `:48` `translate-y-[0.06em]` ·
`:80` `max-w-[16rem]`.

Each is justified in prose as "the exact optical ratio at the display-1 basis". None is a token.
`PROPORTION-AUDIT.md:73` — "Real rendered relation wins over token intent" cuts both ways: a
hand-derived em ratio is neither a token nor a measured relation, it is a frozen guess about a
basis the component no longer uses (`:209` moved to display-2).

## D-13 — Two model idioms in one component; a required model with one real consumer; `any` in the template.

- `modelValue` uses the legacy prop + `defineEmits` pair (`:125`, `:146-148`); `open` uses
  `defineModel` (`:144`). Owner edict 7 (idiomatic Vue 3.5) — `defineModel<string>()` replaces the
  pair.
- `defineModel<boolean>("open", { required: true })` forces every host to own an open ref. The
  About host's `aboutSelectOpen` (`AboutPane.vue:73`) is **write-only** — declared, bound, never
  read. The only real consumer is a hidden `Cmd+K` toggle at `ColorPicker.vue:265`, an unlabelled,
  undiscoverable keyboard affordance (`PROPORTION-AUDIT.md:51`, PR-07).
- `:11` `(colorSpace: any)` — and the same cast repeated in both hosts
  (`ColorPicker.vue:43`, `AboutPane.vue:25`). The emit is typed `[value: string]`; the `any`
  masks the reka `AcceptableValue` mismatch rather than resolving it (edict 2, no masking
  fallbacks).
- `specimenFor` (`:154-166`) puts colour-space conversion, gamut-agnostic serialization and two
  incompatible number-formatting grammars inside a selector component. Cohesion defect; the
  formatting belongs beside `serializePickerColor`.

## D-14 — Physical padding and un-isolated CSS strings in a document that declares a direction.

- `:65` `class="pl-3 pr-4 py-2"` — physical `padding-left`/`padding-right`, measured
  `paddingLeft: 12px / paddingRight: 16px` (P7). `VISUAL-CONSTITUTION.md:150` — "chrome,
  navigation and layout | logical inline/block direction follows the document." The logical form
  (`ps-3 pe-4`) is the same character count.
- The `.specimen-caption` carries no `dir="ltr"`, no `<bdi>`, computed
  `unicodeBidi: "normal"` (P7). `VISUAL-CONSTITUTION.md:154` — "CSS strings, hex, slugs, IDs and
  provenance | render in **LTR-isolated spans** inside RTL prose." Captions such as
  `lab(92% 88.8 20 / 82.7%)` contain paired brackets, which UAX #9 rule BD16 mirrors in an RTL
  paragraph. **HYPOTHESIS** — I could not force this live: with `documentElement.dir="rtl"` the
  app still computes `direction: ltr` on the trigger and caption (P7), so RTL is presently pinned
  off. The code-level absence of isolation is fact; the rendered mirroring is unproven.
- The asymmetric 12/16 px gutter is vestigial: it was tuned for the indicator-less row. Restoring
  the constitutional indicator (D-2) collides with it at 12 px.

## D-15 — In dark mode the component's one chromatic gesture is achromatic.

Measured `--accent-live` (P4):

```
light: oklch(47.118925176164% 0.188447570516 9.83402284231deg)   chroma 0.188
dark : oklch(95.832172477266% 0.021053120065 9.83402284231deg)   chroma 0.021   (−89 %)
```

Rendered trigger ink: light `color(srgb 0.665 0.000 0.261 / 0.86)` — a saturated crimson; dark
`color(srgb 1.000 0.925 0.933 / 0.86)` — effectively white. `safari-desktop-dark/picker.png`
shows it: the title that carries the product's chromatic identity in light mode is a neutral
near-white in dark. `VISUAL-CONSTITUTION.md:21` sanctions seed tint for the "active accent";
`:144` — "No path desaturates through gray." At chroma 0.021 the active accent is not an accent.

Mechanism is `certifyAccentInk` / `useContrastSafeColor.ts:302-311`, which is not this file — but
this component is the largest, most prominent consumer, it hard-codes `86%` alpha on top
(`:191`) with no reference to the tier it lands on, and it is why the same ink measures **3.89 : 1**
on the picker plate and **4.79 : 1** on the About plate in light (PIL sample of the tracked Safari
captures; peak ink pixel vs modal background over the title bounding box). One grammar, two
rendered contrasts. `VISUAL-CONSTITUTION.md:82`.

---

# Negative evidence — what I checked and found sound

These were interrogated and did **not** produce a finding. Recording them so the next seat does
not re-spend the browser budget.

| Checked | Result |
|---|---|
| Tap-target floor | trigger 111.5 × 84.9 (desktop), 70.1 × 52.5 (390), 88.6 × 47.9 (About inline); option rows 284 × 80.7. All clear 44 × 44. |
| `role="option"` / `aria-selected` | Present and correct on all 18 options in all 8 open arms (reka supplies them). The a11y half of `VISUAL-CONSTITUTION.md:90` holds; only the *visual* half fails. |
| `verbatimModuleSyntax` (edict 8) | `:122` `import type { DisplayColorSpace }` — correct; no other type-only import. **Clean.** |
| Reactive props destructure (edict 7) | `:125` — correct Vue 3.5 idiom. |
| Motion tokens (edict 6) | `:192`, `:254` use `--duration-fast` / `--ease-standard`; no keyframes deleted, none minted. **Clean** at the component; the defect is the host's (D-10). |
| God module (edict 1) | 311 lines, ~110 of them comment. Not a god module. |
| New shared/ dirs or wrappers (edict 3) | None. **Clean.** |
| Console / page errors on `/#/` | `../../visual/REPORT.md:15-26` — 0 pageErrors, 0 horizontalOverflow, 1 consoleError (`WebGL: context lost`, unrelated to this component). |
| Open-panel viewport overflow | `contentBottomOverflow` −266.5 (1440), −216.5 (390), −12.0 (720). Never clipped by the viewport. |
| Space-name RTL reordering | "Display P3", "sRGB Linear", "Rec. 2020" are strong-LTR runs; UAX #9 W7 keeps them intact. Not a defect. |
| `rtl-desktop` / `forced-colors-desktop` tracked captures | **Void for this component.** `forced-colors-desktop/picker.png` is a plain light render — WebKit did not honour `forcedColors: active`. All forced-colors findings here come from the Chromium probes (P2/P3), which do. Flagging for the visual-audit owner. |

---

# Family grouping — five mechanisms, not fifteen bugs

The fifteen findings collapse into five root mechanisms. Cure the mechanism, not the row.

| Family | Members | Mechanism | Gestalt cure |
|---|---|---|---|
| **F1 · local register instead of producer register** | D-1, D-5, D-2, D-8 | The component mints its own focus ring, its own selection marker and six overrides of glass-ui internals rather than consuming the producer's | Delete the local focus block and `hide-indicator`; move every remaining need into a glass-ui variant and relay to the BH inbox (edicts 4 + 5) |
| **F2 · two scaling bases** | D-4, D-6, D-10 | Identity scales on `vw`, headline on `cqi` × a JS factor, condense animates `font-size`; no two of the three can hold a ratio | One clamp, one base, for the identity/headline pair; discrete rung swap on condense |
| **F3 · the catalog was designed as typography, not as a control** | D-3, D-9, D-15 | Display family + `text-title` + a glass panel over the readout + an unbounded serializer string in a 234 px box | Re-cast the catalog at the legislated `text-small` control rung with one canonical value grammar, widened and anchored clear of the readout |
| **F4 · compositional duplication** | D-7 | About ships as Picker's companion instead of the `/about` member route, so the component instantiates twice on one screen | Land `/about` as a route (W18/W19 own it); the second combobox disappears with the companion |
| **F5 · stale self-documentation** | D-8, D-11, D-12, D-13 | The scoped block's 110 lines of prose describe a world that has moved: a producer hardcode that is now a token, a PRM guard that no longer applies, ratios derived at a basis the component abandoned | Every "BOOKED SWAP" comment is a debt with a checkable precondition. Check them; retire the ones that are due; delete the prose that is no longer true |

---

# Appendix — reproduction commands

```bash
# all measurements in this report, from the repo root, dev server live on :9000
node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D.mjs   # P1 (WebKit, 12 arms)
node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D2.mjs  # P2 (Chromium forced-colors)
node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D3.mjs  # P3 (state-delta capture)
node docs/tranches/V/megatranche/audit/components/ColorSpaceSelector/probe-D4.mjs  # P4 (focus-ring sweep)
```

Frames produced: `D-open-1440-{light,dark}.png`, `D-open-390-light.png`,
`D-open-1440-about.png`, `D-open-zoom200.png`, `D-focus-{normal,forcedcolors}.png`,
`D-state-{fc,nc}-{rest,hover,focus}.png`, `D-ring-*-{rest,focus}.png`.

Chromium requires `http://127.0.0.1:9000`; `localhost` times out in this environment.

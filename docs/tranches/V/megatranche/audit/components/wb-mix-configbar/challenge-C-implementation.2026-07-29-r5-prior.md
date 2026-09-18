# CHALLENGE-C — `demo/workbenches/mix/MixConfigBar.vue` — implementation (r5)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
This seat was spawned with an explicit Opus 5 declaration and is serving it as declared. Nothing
here is inherited, defaulted, or undeclared.

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`, glass-ui `7.0.0`
installed, dev server live on `:9000`. **No source edits.** This seat wrote only inside
`docs/tranches/V/megatranche/audit/components/wb-mix-configbar/`; probe scripts live in the
session scratchpad, outside the repo tree.

**Pass note.** Four prior passes exist and are preserved verbatim (`…r1-prior.md` …
`…2026-07-28-r4-prior.md`). Their ledgers are real and I re-derived the load-bearing ones myself
*before* reading them. r1–r3 audited the props, the tokens, the a11y wiring and the gates. r4
did the thing none of them had done — it executed the component's nine-space vocabulary against
actual colors, and found that the `HSL` row plus a white operand takes the whole application
down.

**This pass exists because all four audited the component in exactly one condition: default
scheme, desktop width, LTR, dropdown closed.** Nobody had measured the text this component
itself authors, and nobody had asked what happens to it under any user preference. That is what
I did — plus I *ran* the e2e leg the prior rounds reasoned about, and I killed three of my own
hypotheses with measurements rather than filing them.

Tags: **[NEW]** = absent from r1–r4. **[CONFIRMED]** = prior claim, re-derived here by my own
probe. **[REFUTED]** = a hypothesis (mine or prior) that measurement killed.

---

## Verdict

**DEFECTIVE** — r4's two blockers stand, and this pass adds **three MAJOR** findings plus one
INFO, all measured, none previously filed. Three of my own hypotheses were refuted and are
recorded as such so no future round re-files them.

The one-line addition to the record:

> **This component certifies its decoration and never its text.** The preview chip has a
> byte-identity oracle, a feasibility oracle, a paint-versus-floor leg and a `data-stops` stamp.
> The 11-pixel sentence beside it — the only thing in the entire application that tells a user
> what `HWB` or `LCh` *means* — has no floor, no token, no capture in any of the six
> alternate-condition matrices, is absent from the app's own forced-colors and print color-surface
> rosters, and measures **3.65 : 1** against a ground that is not even constant.

---

## What I executed this pass

| # | probe | tool | result |
|---|---|---|---|
| P1 | **ran** `o14-preview-truth.spec.ts -g "T-17"` — the component's only live gate | `playwright` | 2 failed / 1 passed, output pasted (§C-6) |
| P2 | the O-14 regex vs. the shipped serialization, in-browser, all three stop shapes | `playwright evaluate` | §C-6 — stamped matches **0**, painted matches n, achromatic passes **vacuously** |
| P3 | 9 spaces × 4 arcs, distinct-ramp census | `vite-node` | §C-4 confirmed |
| P4 | alpha / achromatic / degenerate serialization + timing (20-run means) | `vite-node` | §negative proof |
| P5 | SFC compile — props defaults + handler caching | `vue/compiler-sfc` | **3 hypotheses REFUTED** |
| P6 | live DOM: trigger heights vs `--control-h-*`, orphan labels, verb state | `playwright` | §C-10 sharpened, §C-7 confirmed |
| P7 | live DOM: add-slot inline style + full stylesheet walk for `pointer-events` | `playwright` | §C-2 confirmed, mechanism nailed |
| P8 | **320 px reflow** — grid, columns, clipping, `docOverflowX` | `playwright` | **REFUTED** |
| P9 | **menu-open geometry** — viewport box, scroll, rows visible | `playwright` | §R5-5 **NEW**, one hypothesis REFUTED |
| P10 | **contrast of the `#description` text against the composited menu ground** | `playwright` | §R5-1 **NEW · 3.65 : 1** |
| P11 | forced-colors / print roster membership | `grep` | §R5-2 **NEW · count 0** |
| P12 | alternate-condition matrix coverage | `STATES.json` | §R5-4 **NEW · 0 of 30** |

---

# Part 1 — new findings

## R5-1 · MAJOR **[NEW]** — the option descriptions this component authors fail WCAG 1.4.3 at **3.65 : 1**, and they are the only explanation of the nine spaces

`MixConfigBar.vue:112` and `:134` are the component's own lines — this register is chosen here,
not inherited from glass-ui:

```vue
<span class="text-micro text-muted-foreground">{{ s.description }}</span>
```

Measured live with the Color-space menu open at 1280×720, compositing the ancestor background
stack over the published page ambient (the O-18 census model the repo's own oracles use):

```json
{ "descText": "Perceptual, hue-preserving",
  "fontSize": "11px", "fontWeight": "400",
  "color":  "rgb(195, 185, 172)",
  "ground": "rgb(99 86 71)",
  "contrast": 3.65,
  "wcagAA_normalText_4_5": false,
  "wcagAA_largeText_3": true }
```

11 px at weight 400 is **normal text** — the WCAG large-text carve-out needs ≥ 18.66 px bold or
≥ 24 px. The floor is 4.5 : 1. The measurement is **3.65 : 1**.

Two aggravations, both structural rather than cosmetic:

1. **The ground is not a constant.** The menu is `data-surface="glass"` (`dist/select-BcBAyLXA.js:196`)
   — a translucent panel floating over a *live aurora field*. The 3.65 : 1 above is one sample of
   a ratio that moves with whatever the aurora is doing behind it. There is no value of
   `--muted-foreground` that makes an 11 px string safe over an animated translucent ground; the
   register is the defect, not the token's current value.
2. **The repo already owns the machinery and pointed it at the decoration instead.** The O-14
   feasibility legs walk *the chip's* painted stops against `RAMP_MENU_FLOOR = 4.5` and
   `RAMP_TITLE_FLOOR = 3` (`o14-preview-truth.spec.ts:230-231`) — certified, per-site, against
   the composited surface. The aria-hidden ornament is certified. The sentence beside it, which
   is the actual information, is not walked by anything.

`MixConfigBar.vue:95-96` records that "the permanent subtitles died — the dropdown's own
`#description` rows already tell the story once, on demand." The story is now told *only* here,
below the floor.

**Cure (register, not override).** Promote the description to the caption register that the rest
of the app already uses for explanatory text and bind its colour to the certified floor the
palettes ramp resolver already computes per site. Edict 5 forbids the per-instance colour patch;
the correct edit is one register change in the two lines that chose `text-micro`.

---

## R5-2 · MAJOR **[NEW]** — `.preview-chip` is missing from the app's own colour-surface roster, in **both** media queries that consume it — and the chip's only edge is a `box-shadow` both of them delete

`demo/styles/foundation.css:653-663` declares a single enumerated roster and names its purpose:

> "**COLOR-SURFACE ROSTER** (the two-tier `forced-color-adjust` policy below reuses it): the
> surfaces whose whole PURPOSE is to show a color — the actual content of a color tool — must
> survive WHCM's system-color substitution."
> "The **ONE** roster, reused by `@media (forced-colors)` + `@media print` so the 'keep the
> colors' set is declared ONCE."

The forced-colors tier-1 list (`:678-698`) and the print list (`:829-834`) enumerate the same
surfaces — `canvas`, `.spectrum-picker`, `.gamut-overlay`, `.atmosphere-canvas`,
`[data-glass-field-canvas]`, `.gradient-rail`, `.rail-handle`, `.readout-rail`, `.swatch-row > *`,
`.generate-swatch`, `.shadow-swatch`, `.goo-blob-canvas`, `.watercolor-swatch`,
`.glass-slider[data-variant="spectrum"] .slider-range`, `[data-color-surface]`.

Every sibling colour-display surface in the demo is on it. This component's is not:

```
$ grep -rn "preview-chip\|preview-strip" demo/styles/
(count: 0)

$ grep -rln "data-color-surface" demo/
demo/styles/foundation.css          ← the selector's only occurrence; no component opts in
```

`PreviewRamp.vue` (read whole, 51 lines) carries `class="preview-chip"`, `aria-hidden`,
`:data-stops` and an inline `background-image` — no roster class, no `data-color-surface`, no
`forced-color-adjust`.

The second half compounds it. The chip's *only* boundary is a shadow:

```css
/* PreviewRamp.vue:46-49 — "designed color out-ranks bleed" */
box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
```

and both consuming media queries remove exactly that: the forced-colors docstring states "WHCM
strips author colors **+ box-shadow**" (`foundation.css:666`), and the print block is literal —
`* { box-shadow: none !important; }` (`foundation.css:815`). So in the two conditions the roster
exists to serve, the chip loses its colour policy *and* its edge, in the same breath.

**Reproduction: NONE — reasoned from the roster, not executed.** I did not emulate WHCM in this
seat. What is a *fact* is the omission: a named, enumerated, twice-reused roster with a zero-hit
grep for this component's surface, while fourteen sibling surfaces are listed.

**Cure**: add `.preview-chip` to the one roster (it is a single line in a list that already
exists — no new mechanism, no new file) and give the chip a real `border` rather than an inset
shadow, so its identity survives the media queries that strip shadows by design.

---

## R5-3 · MAJOR **[NEW]** — the chip's gradient hard-codes a **physical** direction in an app that ships two supported RTL matrices

`PreviewRamp.vue:24-26`:

```ts
const gradient = computed(() => `linear-gradient(90deg, ${stops.join(", ")})`);
```

`90deg` is left-to-right, unconditionally. The visual gate treats RTL as a supported condition —
`STATES.json` carries `rtl-desktop` and `rtl-mobile` matrices with five captured routes each,
and `shots/rtl-desktop/`, `shots/rtl-mobile/` exist on disk. Under `dir="rtl"` the option row
mirrors: the indicator dot, the label, the description and the chip all move to the opposite
inline edge and read right-to-left. The ramp inside the chip does not. A preview whose entire
job is to show *where an interpolation goes* then points against the direction everything beside
it reads.

CSS has the logical spelling and it is free: `linear-gradient(to inline-end, …)`.

**Reproduction: NONE — hypothesis.** `#/mix` is in neither RTL matrix (see R5-4), so no capture
exists to point at, and I did not stand up an RTL context myself. The physical-direction literal
and the existence of the RTL matrices are both facts; the visual consequence is reasoned.

---

## R5-4 · MAJOR **[NEW]** — the visual gate has **six** alternate-condition matrices and `#/mix` is in **none** of them; no capture anywhere opens a dropdown

`docs/tranches/V/megatranche/audit/visual/STATES.json` — 30 captures, enumerated:

```
$ node -e "…STATES.json…"
shape: array len 30
zoom-200-desktop        → #/  #/gradient  #/browse  #/blob  #/admin/users
reduced-motion-desktop  → #/  #/gradient  #/browse  #/blob  #/admin/users
forced-colors-desktop   → #/  #/gradient  #/browse  #/blob  #/admin/users
rtl-desktop             → #/  #/gradient  #/browse  #/blob  #/admin/users
rtl-mobile              → #/  #/gradient  #/browse  #/blob  #/admin/users
keyboard-focus-desktop  → #/  #/gradient  #/browse  #/blob  #/admin/users
```

Six matrices × the **same five routes**. `#/mix` appears **zero** times. Confirmed on disk:
`ls shots/forced-colors-desktop/` → `adminusers.png blob.png browse.png gradient.png picker.png`
— no `mix.png`, in any of the six directories.

And across the whole gate — the four Safari matrices *and* the six condition matrices — **no
capture opens a dropdown.** Every `/#/mix` shot is the closed state
(`shots/safari-desktop-light/mix.png`, read visually: two closed triggers reading "OKLab" and
"Shorter", the disabled verb below). The `#description` rows — the chips, the descriptions,
R5-1's contrast, R5-2's forced-colors exposure, R5-3's direction — have never been photographed
in any condition, in any scheme, on any device.

Stack this on r4's R4-4 (`ci.yml` runs no Playwright step at all) and the coverage statement is
exact: **MixConfigBar's menu surface has no automated behavioural coverage, no automated visual
coverage, and no alternate-condition coverage.** The only artefact that has ever looked at it is
this audit series.

**Cure**: the harness is a data-driven route list; adding `#/mix` to the condition matrices is a
list edit, and a menu-open state is the same kind of state the harness already models
(`states.mjs`). The gap is enumeration, not capability.

---

## R5-5 · INFO **[NEW]** — the 9-row menu does not fit: 476 px of rows in a 358 px viewport, 2 of 9 spaces below the fold

Measured with the Color-space menu open at 1280×720:

```json
{ "content":            { "w": 229, "h": 384, "top": 41, "bottom": 425 },
  "viewportClientHeight": 358, "viewportScrollHeight": 476, "scrollable": true,
  "optionCount": 9, "optionsFullyVisibleWithinContent": 7,
  "firstOption": { "name": "OKLCh Perceptual, hue-preserving", "h": 51.8 },
  "lastOption":  { "name": "XYZ CIE absolute", "top": 461.1, "bottom": 512.8 },
  "chips": 0 }
```

Nine 51.8 px rows (label line + description line) need 476 px; 358 px are available. `RGB` and
`XYZ` are below the fold on a standard desktop viewport. glass-ui renders scroll buttons around
the viewport (`dist/select-BcBAyLXA.js:205,213`), so it is discoverable — hence **INFO**, not a
defect. It is recorded because it is the direct cost of the two-line row this component chose,
and because it interacts with R5-1: the row is tall *because* of the description, and the
description is unreadable.

---

# Part 2 — three hypotheses of mine, **REFUTED** by measurement

Filed so no future round spends a pass re-deriving them.

### REFUTED — reflow blowout at the 320 px WCAG 1.4.10 floor

`MixConfigBar.vue:94` is `<div class="grid grid-cols-2 gap-2">` — no responsive prefix, no
`min-w-0` on the children, and the **only** unconditional two-column grid among the workbench
control bars (`ExtractWorkbench.vue:6` uses `sm:grid-cols-2`; `GradientVisualizer.vue:158` pairs
`grid-cols-3` with `min-w-0`). I expected clipping. Measured at a 320 px viewport:

```json
{ "vw": 320, "gridCols": "123px 123px", "triggers": [{"w":123,"h":36},{"w":123,"h":36}],
  "valueSpan": [ {"text":"OKLab","clipped":false}, {"text":"Shorter","clipped":false} ],
  "labels":    [ {"text":"Color space","clipped":false}, {"text":"Hue method","clipped":false} ],
  "docOverflowX": 0 }
```

Nothing clips, nothing overflows. **Not a finding.** Recorded with one caveat: it holds because
every value in the vocabulary is 3–10 characters. The guard is the content, not the layout.

### REFUTED — the SelectContent viewport is sized to the trigger

glass-ui puts `h-(--reka-select-trigger-height)` on the select viewport
(`dist/select-BcBAyLXA.js:208`) and reka sets that variable to the trigger's height — measured
**36 px**. A 36 px `overflow-y: auto` box holding 476 px of rows would be a spectacular bug. It
is not what happens: computed viewport height is **358 px** (`max-h-[inherit]` and the flex
context win). **Not a finding.**

### REFUTED — per-render handler churn and prop-default identity churn

I suspected the three inline arrow casts (`:99`, `:122`, `:146`) minted new `onUpdate:modelValue`
functions each render, and that `operandColors = []` re-created its default per read. Compiled
the SFC to check:

```
--- render-scope arrow handlers ---
"onUpdate:modelValue": _cache[0] || (_cache[0] = (v) => emit('update:colorSpace', v as PickerSpace))
"onUpdate:modelValue": _cache[1] || (_cache[1] = (v) => emit('update:hueMethod', v as HueInterpolationMethod))
"onUpdate:modelValue": _cache[2] || (_cache[2] = (v) => emit('update:leftoverStrategy', v as LeftoverStrategy))
--- props ---
operandColors: { type: Array, required: false, default: () => ([]) }
```

All three handlers are `_cache`d by the compiler (16 cache slots in the render); Vue caches the
resolved default factory value in `propsDefaults`. **Both refuted.** The only real identity churn
is `MixPane.vue:103`'s fresh `.map()` per parent render (r4 §R4-8), and its cost is measured
below as sub-frame.

---

# Part 3 — the prior ledger, independently re-derived

I re-measured these myself before reading r4. **Nothing in r1–r4 is refuted.**

| id | prior | this pass | my own evidence |
|---|---|---|---|
| **C-2** | BLOCKER | **CONFIRMED + mechanism nailed** | `pointer-events: none` is an **inline** style written by the glass-ui primitive, not a stylesheet rule — a full walk of every `CSSRule` mentioning `pointer-events` that the element `matches()` returned `hits: []`, and the element's `style` attribute reads `…; pointer-events: none; --watercolor-color: …`. Element is `<span aria-hidden="true">`, `role: null`, `tabindex: null`, `tagAttr: null`. glass-ui 7.0.0's `WatercolorDot` prop surface is `color / variant / animate / cycleDuration / range / seed` — **no `tag`, no `as`, no `disabled`**; `MixSourceSelector.vue:166-174` passes all three plus `aria-label`. Playwright's hit-test: `<div class="swatch-row …"> intercepts pointer events`. |
| **C-6** | MAJOR | **CONFIRMED — I ran it** | `npx playwright test …o14-preview-truth.spec.ts -g "T-17"` → **2 failed, 1 passed (1.5m)**, both failures `locator.click: Test timeout of 30000ms exceeded · waiting for getByRole('button', { name: 'Add current color to the mix' })` at `:355` and `:414`. **And the second, independent RED beneath it, measured in-browser:** the stamp is `oklch(62.795536392143% 0.257683303805 29.233880279628deg)`; the spec's `parseOklchTriples` regex (`:157`) dies on the `%` after L and matches **0**; the computed paint canonicalizes to `oklch(0.627955 0.257683 29.2339)` and matches **n**. `expect(painted.length).toBe(stamped.length)` compares 17 against 0. **Achromatic operands make it worse:** the sampler emits `oklch(59.987080562215% 0 none)`, both sides match 0, `0 === 0` passes having compared *nothing*. **Named green-keeping mutation: replace the whole gradient with `linear-gradient(90deg, oklch(0.5 0 none), oklch(0.5 0 none))`** — a flat grey chip lying about every space and every arc survives the byte-identity leg for achromatic operands. And the one leg that *does* pass today ("honest absence … NO chip") passes vacuously: **delete lines 57-74 and 104-137 of MixConfigBar.vue — the ramps, the chips, the whole `#description` slot — and it stays green.** |
| **C-4** | MAJOR | **CONFIRMED** | `distinct-of-4 = 1` for `oklab`, `lab`, `rgb`, `xyz`; `= 2` for the five cylindrical spaces. The shipped default is `oklab` (`useMixingState.ts:44`), so out of the box the Hue menu draws four byte-identical chips beside four different descriptions, for a control with zero effect. |
| **C-7** | MAJOR | **CONFIRMED** | live: `[{text:"Color space",htmlFor:null,hasControlDescendant:false},{text:"Hue method",htmlFor:null,hasControlDescendant:false}]`, third in palettes mode. Sharpened: these are the **only** `<label>` elements among the seven `.section-label` sites — `GradientVisualizer` ×4, `MixSourceSelector`, `GenerateControls` ×2, `SearchFilterBar` ×4, `TagEditPopover`, `AdminTagsPanel` all use `<span>`/`<div>`. And the app's *other* labels are wired correctly (`htmlFor: "reason-inappropriate"` etc.), so this is a local regression, not a house style. glass-ui ships the cure: `LabeledField`'s default slot hands out `{ controlId, labelledBy, describedBy, … }` and its `controlLabelable` prop docstring names this exact case ("composite controls whose root is a non-labelable element … the label drops the invalid `for`"). `grep -rln "LabeledField\|LabeledSelect" demo/` → **nothing**. |
| **C-9** | MINOR | **CONFIRMED** | the ` / 1)` strip at `sample.ts:40` is unreachable: `colorToCss` emits no alpha at all when opaque (`oklch(62.79…% 0.2576… 29.23…deg)`) and a **percentage** when not (`… / 82.7%`, `… / 50%`). The regex cannot fire on any library output. |
| **C-10** | MINOR | **CONFIRMED + sharpened** | live: both triggers compute **36.00 px** with class `h-9`; `--control-h-md` = `max(calc(2.5rem * 1), 0px)` = **40 px**, `--control-h-sm` = **36 px**. So `h-9` is *exactly* `size="sm"` rewritten as a magic number, and glass-ui's SelectTrigger already ships that register (`dist/select-BcBAyLXA.js:97-102`: `case "sm": return "h-(--control-h-sm)"; default: "h-(--control-h-md)"`). The cure is two characters of intent (`size="sm"`) replacing a hard-coded pixel. |
| C-1 | BLOCKER | carried, **not re-measured** | I measured the verb's state (`disabled: true`, `aria-disabled: null`, `aria-describedby: null`, 324×40, removed from tab order) but did not re-check r4's `data-emphasis="secondary"` attribute claim. I do not claim to have verified it. |
| R4-1, R4-2, R4-6, R4-7 | BLOCKER/MAJOR/MINOR | carried | r4's colour-domain work. I did not re-execute it and do not claim to have. |

---

# Part 4 — negative proof (this pass's own measurements)

Absences I can defend as evidence rather than silence.

- **The "costs nothing at rest" claim at `:19-22` is TRUE.** `SelectContent` portals through
  `SelectPortal` and mounts no viewport when closed; there is no `forceMount` anywhere in
  `dist/select-BcBAyLXA.js:187-224`. The computeds are lazy, so at rest the sampler runs zero
  times. The comment is honest.
- **The ramps are sub-frame.** 20-run means, `vite-node`/V8: **0.70 ms** for the full 9-ramp
  space map at 2 operands, **1.19 ms** at 8 operands, **0.26 ms** for the 4-ramp hue map. r3's
  assessment of the `MixPane.vue:103` churn as sub-frame stands; I do not contest it.
- **The sampler is total against hostile input.** `""` → `null`; `"oklch()"` — the repo's live
  `parseCssColor` crash class — → `null` (the `try`/`catch` at `sample.ts:60-66` holds); `[]` and
  a single operand → `null`. The one gap is `serializeStop` at `:82`, called **outside** the
  `try`; *hypothesis, not reproduced.*
- **Stop counts are correct at every arity.** 2→17, 3→17, 4→19, 5→17, 9→17, 17→17 — the
  joint-dedupe arithmetic at `sample.ts:68-74` behaves as documented.
- **Menu semantics are correct.** 9 option rows, `chips: 0` with zero operands (honest absence
  rendering as designed), exactly one `aria-hidden` element per row (the indicator dot), option
  text composes as `"OKLCh Perceptual, hue-preserving"`.
- **No hazard-class code in the file.** All 173 lines: no `requestAnimationFrame` (zero PRM-RAF
  exposure), no `addEventListener`, no observers, no timers, no lifecycle hooks, no `async`, no
  `fetch`, no WebGL, no `defineModel` (so the stale-read round-trip cannot apply), no `ValueUnit`
  construction, no reka slider. Nothing to leak, nothing to cancel. `PreviewRamp` is static
  paint and documents itself PRM-neutral (`PreviewRamp.vue:14`).
- **`verbatimModuleSyntax` clean** — all five type-only imports (`:12-15`, `:18`) are
  `import type`; both value imports are used.
- **Zero contribution to the REPORT's a11y counters.** `/#/mix`'s 8 small tap targets enumerate
  as `input 160×23`, three `22×22` slug controls (`Switch to slug` / `Generate new slug` /
  `Cancel`) and four `12×24` picker channel spans (`L/A/B/ALPHA channel`) — all from the dock and
  the colour picker. MixConfigBar renders 158×36, 158×36 and 324×40; all ≥ 24 px, all named.
- **Not a god module.** 173 lines, one job, no invented `shared/` directory, no wrapper
  component. Edicts 1 and 3 hold apart from r4's R4-8.

---

## Findings table (r5)

| id | severity | status | one line |
|---|---|---|---|
| **R5-1** | **MAJOR** | **NEW · measured** | the `#description` text this file authors (`:112`, `:134`, `text-micro text-muted-foreground`) computes 11 px/400 at **3.65 : 1** over the composited menu ground — below the 4.5 floor, over a *translucent* surface whose ground is not constant, and it is the only explanation of the nine spaces |
| **R5-2** | **MAJOR** | **NEW** | `.preview-chip` is absent from the app's ONE enumerated colour-surface roster (`foundation.css:653-663`) in **both** consumers — `@media (forced-colors)` (`:678-698`) and `@media print` (`:829-834`) — while fourteen sibling surfaces are listed; `grep` count **0**. Its only edge is a `box-shadow` both queries delete by design |
| **R5-3** | **MAJOR** | **NEW · hypothesis** | `PreviewRamp.vue:25` hard-codes `linear-gradient(90deg, …)` — a physical direction — in an app that ships `rtl-desktop` + `rtl-mobile` as supported matrices; the ramp points against the reading order it sits in |
| **R5-4** | **MAJOR** | **NEW** | the visual gate's six alternate-condition matrices (zoom-200 / reduced-motion / forced-colors / rtl-desktop / rtl-mobile / keyboard-focus) cover the **same five routes**; `#/mix` is in **0 of 30** captures, and **no capture in any matrix opens a dropdown** — the menu surface has never been photographed |
| **R5-5** | INFO | **NEW · measured** | 9 rows × 51.8 px = 476 px of scroll content in a 358 px viewport; `RGB` and `XYZ` sit below the fold at 1280×720 (scroll buttons exist, so discoverable) |
| R4-1 | BLOCKER | carried | `HSL` + a white operand throws `color_non_finite`; no `try`/`catch` in the mix tree; the app-root boundary eats both panes |
| R4-4 | BLOCKER | carried | CI runs no Playwright step; `test:e2e` exists and nothing invokes it |
| C-1 | BLOCKER | carried | `variant="primary-audacious"` is not a glass-ui 7 prop |
| C-2 | BLOCKER | **CONFIRMED** | the add-slot is an `aria-hidden` `<span>` with an **inline** `pointer-events: none`; `tag`/`aria-label`/`disabled` are not props of `WatercolorDot` at all |
| C-6 | MAJOR | **CONFIRMED — ran it** | 2 of 3 legs RED (pasted); beneath them a second RED (regex matches 0 of 17 stamped stops); beneath *that* a vacuous pass for achromatic operands; two named green-keeping mutations |
| C-4 · C-7 · C-9 · C-10 | MAJOR/MINOR | **CONFIRMED** | quartet inert in the default space · three orphan `<label>`s, the only ones in seven sites · dead ` / 1)` strip · `h-9` **is** `--control-h-sm` written as a magic number |
| R4-2 · R4-3 · R4-5 · R4-6 · R4-7 · R4-8 · C-3 · C-5 · C-8 · C-11…C-16 | MAJOR/MINOR | carried | see r4 |
| — | **refuted** | **NEW** | 320 px reflow holds (`docOverflowX 0`, no clipping) · the select viewport is 358 px, not the 36 px trigger height · the three `onUpdate` arrows are `_cache`d and the `[]` default is `propsDefaults`-cached — no handler or default churn |

---

## The mechanism this pass adds

r4 named the mechanism behind the colour failures: *the component publishes a menu of nine
capabilities and has never been executed against a colour.* Correct, and I confirm the shape of
it.

The mechanism this pass adds is orthogonal and explains R5-1 through R5-4 at once:

> **Every gate this component has points at its ornament, and every gate runs in exactly one
> condition.** The preview chip — decorative, `aria-hidden`, invisible to assistive technology —
> owns a vitest identity oracle, an e2e byte-identity leg, an e2e feasibility leg with real WCAG
> floors, and a `data-stops` stamp designed so the paint can be held to the sampler. The
> *information* in the same row — an 11 px sentence that is the only place the app explains what
> `LCh` or `HWB` means — has no oracle, no floor, no token, is missing from the colour-surface
> roster that governs it in two media queries, and has never been captured in six
> alternate-condition matrices or in a single dropdown-open screenshot. The apparatus is
> impressive and it is aimed at the wrong half of the row.

Three edits close it, none of them a patch:

1. **`MixConfigBar.vue:112,134`** — move the description off `text-micro`/`text-muted-foreground`
   onto the caption register at the certified foreground floor. One register change, two lines;
   kills R5-1 and takes the R5-5 row height with it.
2. **`foundation.css` roster + `PreviewRamp.vue:47`** — add `.preview-chip` to the ONE roster
   (one line in an existing list) and give the chip a real `border` instead of an inset shadow,
   so its identity survives the two media queries built to strip shadows. Spell the gradient
   `to inline-end`. Kills R5-2 and R5-3 together.
3. **`capture.mjs` / `states.mjs` route lists** — put `#/mix` in the six condition matrices and
   add a menu-open state. The harness already models both; the gap is enumeration. Turns R5-1,
   R5-2 and R5-3 from reasoned into born-RED, and would have caught them without a fifth audit
   pass.

Without (3), the next register chosen below a floor, in a component nobody photographs with its
menu open, ships exactly the way this one did: silently, behind a chip with four oracles pointed
at it.

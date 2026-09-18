# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

**Round 4** · 2026-07-28 · repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`

Prior rounds are preserved and are **not** re-litigated:
`challenge-D-design.2026-07-27-r1-prior.md`,
`challenge-D-design.2026-07-28-r2-prior.md`,
`challenge-D-design.2026-07-28-r3-prior.md`.

r1 named the mechanism (*written against a glass-ui that no longer exists*). r2 named the second
(*models the dependency that does not matter, hides its information in the slot that disappears*).
r3 named the third (*overrides the producer's box and only the box*). Round 4 does something a
fourth round is uniquely positioned to do:

> **It removes a false PASS from the evidence base.** r2 certified "**Truncation … PASS.
> `scrollWidth == clientWidth` at every width"** and r3 re-affirmed it as negative proof
> (*"The producer's truncation is intact"*). Both are **wrong**, and wrong for a nameable reason:
> they measured the trigger `<button>`, whose `overflow` is `visible`, instead of the value `<span>`
> one level down, which is `-webkit-box / line-clamp: 1 / overflow: hidden / **text-overflow: clip**`.
> At the canon's own 320px arm the selected value is sheared mid-word — **in Chromium and in
> WebKit** — with the chevron riding the surviving glyph and no ellipsis anywhere.

Round 4's other new instruments: **glyph-level** contrast of the verb's own word (prior rounds
measured capsule *boundaries* and the *caption*, never the word `Mix`); an **exhaustive named-button
inventory of the whole `/#/mix` route under a seeded two-palette store**, which closes the last
hypothetical operand path; the **open menu's selection marker**; and a **demo-wide census** of the
dead Button vocabulary r1 found at one site.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** This round contributes **one MAJOR record-correction**, **two MAJORs**, **two
MINORs**, **two INFOs**. Every prior-round BLOCKER stands unrebutted; nothing in this round rescues
the component.

---

## Evidence base for this round

| Instrument | What it produced |
|---|---|
| **Cross-engine node-chain probe** (`p10.mjs`) — Chromium **and** WebKit, 320 & 390, walking every descendant of the trigger and reporting `scrollWidth/clientWidth/overflow/text-overflow/line-clamp` per node | the record correction (R4-1): the clip lives on the child span, not the button |
| **Element screenshots after a real option selection** (`trunc-{chromium,webkit}-{320,390}.png`) | pixel proof of the shear |
| **Glyph-contrast decode** (`p4.mjs`): element screenshot at DPR 2 → `magick … rgb:-` → per-pixel WCAG relative luminance; background = modal luminance bin, glyph = the 0.2% tail furthest from it | the verb's own word: **3.24:1** light, **2.77:1** dark |
| **Seeded-store route inventory** (`p7.mjs`, `p8.mjs`): `localStorage["color-palettes"]` pre-seeded with two local palettes, `From palettes` expanded, then every `<button>`'s accessible name enumerated | `buttonsWithAdd: 0` — the last operand path is dead (R4-4) |
| **Open-menu probe** (`p2.mjs`, `p5.mjs`) + `listbox-0operands-light.png`, `listbox-hue-{320,390}.png` | popover width inheritance and the selected-option marker (R4-3) |
| **Rendered-attribute dump** (`p9.mjs`) across three components on one page | the dead-variant blast radius (R4-5) |
| ARIA snapshot of the bar (`p5.mjs`, `locator.ariaSnapshot()`) | the double-announcement transcript (R4-7) |
| Shipped captures `visual/shots/safari-{desktop,mobile}-{light,dark}/mix.png` | read as images; crops `cfg-safari-desktop-{light,dark}.png` |
| glass-ui 7.0.0 dist `.d.ts` + `components/button/styles.css` + `styles/typography/utilities.css` | producer contract |
| `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md`, `demo/DESIGN.md` | canon |

`PALETTE-CONTRACT.md` carries **no** binding row for this component (it is an API/data contract —
`/health` readiness, capture atomicity, export byte-exactness). Recorded so no later round re-checks it.

Probes and captures:
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/wbmix/`.
**No file outside `docs/tranches/V/megatranche/audit/components/wb-mix-configbar/` was written or modified.**

---

## R4-1 · MAJOR · **RECORD CORRECTION** — the selected value is sheared at 320px in both engines; the prior PASS measured the wrong node

### What the record says

- r2, findings table and negative-proof table:
  > `| **Truncation** | longest value `Decreasing` forced through the trigger at 320 / 390 / 720 / 1440 | **PASS.** `scrollWidth == clientWidth` at every width. |`
  > `| **No truncation at any width** | `scrollWidth == clientWidth` for the longest value (`Decreasing`) at 320 / 390 / 720 / 1440 |`
- r3, negative proof:
  > `| **The producer's truncation is intact** | the trigger carries `[&>span]:line-clamp-1` from the producer class list; `scrollWidth === clientWidth` for the longest value at 320 / 390 / 1440 (`121/121`, `156/156`, `225/225`). No overflow at any width |`

r3's own numbers give the error away: **`121/121` at 320** is the *button's* scroll/client width
(`w: 123`, border-box; `overflow: visible`). The button can never report overflow. The clip is one
node down.

### What is actually true

`p10.mjs` walks the full descendant chain after **actually selecting** `Decreasing` from the open
menu (not merely measuring the default `Shorter`):

```
######## chromium @320 — AFTER selecting "Decreasing"
BUTTON  w:123  sw:121  cw:121  overflow:visible   clipped:false     <-- what r2/r3 measured
SPAN    w:81   sw:111  cw:81   overflow:hidden    clipped:TRUE      <-- the value
        display:-webkit-box  -webkit-line-clamp:1  -webkit-box-orient:vertical  text-overflow:CLIP

######## webkit @320 — AFTER selecting "Decreasing"
BUTTON  w:123  sw:121  cw:121  overflow:visible   clipped:false
SPAN    w:81   sw:112  cw:81   overflow:hidden    clipped:TRUE
        display:-webkit-box  -webkit-line-clamp:1  -webkit-box-orient:vertical  text-overflow:CLIP

######## both engines @390 — AFTER selecting "Decreasing"
SPAN    w:111.5  sw:111/112  cw:111/112  clipped:false
```

**31px of a 111px word is cut off.** Cross-engine. At a viewport the canon names as a binding
observation arm (`VISUAL-CONSTITUTION §3.2`, §4: *"complete-route 1440px, 390px, 320px, and actual
400%-zoom"*).

### Pixel proof

`trunc-webkit-320.png` — the real Safari engine, 320px, after selection:

> the capsule reads **`Decreas`**, and the chevron glyph sits **on top of** the surviving `s`.

`trunc-webkit-390.png` at the same DPR reads `Decreasing` cleanly. Same artefact visible in the
bar-level crop `bar-320-decreasing.png`.

### Why the producer's recipe does not save it — the mechanism

`[&>span]:line-clamp-1` compiles to `display: -webkit-box; -webkit-box-orient: vertical;
-webkit-line-clamp: 1; overflow: hidden`. That recipe ellipsizes when a **block overflows
vertically** — it caps the box at N lines and marks the cut. Here the overflow is **horizontal**, on
a single unbreakable word (`white-space: normal`, one token, nothing to wrap at). The computed
`text-overflow` on that span resolves to **`clip`**, measured in both engines. So the producer's
truncation affordance is structurally the wrong tool for this failure, and it fails **silently**:
no ellipsis, no title attribute, no aria-description. The user sees a word that is simply a
different word.

The vocabulary is closed and known at build time — `color-space-meta.ts:26-43` contains
`Increasing`, `Decreasing`, `OKLCh`; `MixConfigBar.vue:85-89` contains `Discard extras`,
`Repeat to pad` — so this is not an unbounded-content problem. It is a layout that was never sized
against its own value set: `MixConfigBar.vue:94` pins `grid grid-cols-2` at **every** width, so at
320px each cell is 123px for a value that needs 111px plus a 16px chevron plus 24px of inline
padding = 151px.

**Reproduction (exact).** `node p10.mjs` — for each of `{chromium, webkit} × {320, 390}`: goto
`http://localhost:9000/#/mix`, wait 3500ms, click `[aria-label='Hue method']`, click the
`Decreasing` option, then read the chain. Output pasted verbatim above. Equivalent manual repro:
resize to 320px, open Hue method, choose Decreasing, read the trigger.

**Why this is the round's headline.** A false negative in the evidence base is more expensive than
the defect it hides: three rounds of this audit have carried "no truncation at any width" as proved
ground. Any wave that trusted it would have shipped the shear. Measuring the styled node rather than
the semantic one is a repeatable methodological trap — **`overflow: visible` on a flex trigger makes
`scrollWidth == clientWidth` unconditionally true, so that comparison on a trigger element is
information-free.** Future truncation probes in this program must walk to the node whose computed
`overflow` is not `visible`.

**Cure.** Two independent, both wanted. (1) The grid must collapse before its own longest member
stops fitting — `grid-cols-1 sm:grid-cols-2`; at 320 the fields stack and the value has 280px.
(2) The producer's value span must carry `text-overflow: ellipsis` so that *any* consumer's
under-width cell degrades legibly rather than silently — a glass-ui BH relay item, since
`line-clamp-1` is producer-owned and every `Select` consumer inherits this seam.

---

## R4-2 · MAJOR · the verb's own word has never been measured: 3.24:1 light, 2.77:1 dark

Prior rounds measured two contrast quantities and not this one:

| quantity | who | value |
|---|---|---|
| `Mix` capsule **boundary** vs local ground | r1 (composite), r3 (PNG decode) | 1.095 / 1.060 shipped; 1.197 / 1.123 derived-enabled |
| `COLOR SPACE` **caption** ink vs ground | r3 (peak-ink) | 4.367 light / 3.681 dark |
| **the word `Mix` itself** | *nobody* | — |

Measured this round (`p4.mjs`; Playwright element screenshot at DPR 2 → ImageMagick raw RGB →
WCAG relative luminance per pixel; background = modal luminance bin over the 75,768-pixel crop,
glyph = the 0.2% tail furthest from that mode):

| matrix | background L | glyph L | **contrast** |
|---|---:|---:|---:|
| desktop light, shipped disabled | 0.7373 | 0.1932 | **3.24 : 1** |
| desktop dark, shipped disabled | 0.1059 | 0.3813 | **2.77 : 1** |

Computed style behind those pixels (`p1.mjs`, `p3.mjs`): `opacity: 0.5`, `color` **unchanged** from
the enabled state (`rgb(28,25,23)` light, `rgb(233,230,226)` dark), background
`oklab(0.915626 0.00551148 0.0130686 / 0.52)` light / `oklab(0.414855 0.00942762 0.0161359 / 0.6304)`
dark. The state is one uniform veil over fill, border, four inset speculars and glyph together.

This closes a gap the prior rounds left open by construction. r1/r3 proved the *capsule* is barely
bounded (≈1.1:1); this proves the *label inside it* is also below every legibility floor the canon
sets — and that **dark is worse than light**, extending r3's inversion finding from boundaries to
ink. `VISUAL-CONSTITUTION §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; a token name is not evidence."* Both text and boundary now have rendered
numbers, and both fail in both schemes.

Honest scope: WCAG 1.4.3 exempts disabled controls, so this is **not** an AA violation. It is a
constitution violation and a product one — the shipped default state of `/#/mix` is the *only*
state (r1/r2/r3 + R4-4), so 3.24:1 / 2.77:1 is how the page's one verb reads **always**, not in an
edge case.

**Reproduction.** `node p4.mjs`; crops `btn-disabled-light.png`, `btn-disabled-dark.png` and the
decode function are in the scratchpad. Cross-check: the shipped Safari crops
`cfg-safari-desktop-{light,dark}.png` show the same thing by eye — in dark the serif `Mix` reads as
a smudge on the plate.

---

## R4-3 · MAJOR · the open menu's selection marker is a pill-outline, and the popover inherits the crushed trigger width

r2 measured the panel's row arithmetic (9 × 52.4px in a 384px panel; the last 93.3px scrolled). Two
things inside that panel were never examined.

### (a) The selection marker contradicts the sibling selector's binding law

`listbox-0operands-light.png` (Color space menu open, 1440, light): the selected row `OKLab` is
marked by a **pink rounded outline around the entire row**. There is no indicator gutter and no
check glyph. Measured: `aria-selected` is present and correct on the row.

`VISUAL-CONSTITUTION §4.2` legislates the app's registered color-space species in detail:

> `ColorSpaceSelector` … *"the sole glass-ui `SelectItem` indicator uses its producer-owned gutter.
> It deletes `hide-indicator` and may not add a local pill, halo, pseudo-element, marker, or
> Card/face selected variant. Exactly one visible marker agrees with the selected option and
> `aria-selected`."*

The route therefore ships **two different selection markers for the same domain choice**: the
Picker's registered selector is bound to a gutter indicator, and Mix's unregistered second
color-space select shows a full-row pill. r3's R4-3 established the two-selector duplication from
the *trigger* side (two vocabularies, two orders, two names); this is the same defect measured from
the *menu* side, and it is the half a user actually chooses from.

Attribution is precise: `MixConfigBar.vue:107` passes **no** class to `SelectItem`, so the pill is
producer-owned (`SelectItemProps` exposes only `value/disabled/textValue/class/hideIndicator`). The
defect charged to this file is the decision to reach for raw `Select` primitives instead of the
registered species — which is exactly what made two markers for one choice expressible.

### (b) At 320/390 the popover inherits the trigger's width, so the descriptions wrap

`p2.mjs`, Hue method menu opened at the two mobile arms:

```
hue listbox @390: {"x":199,   "w":160,   "right":359, "vw":390, "h":249.2, "scrollable":false}
hue listbox @320: {"x":146.5, "w":157.5, "right":304, "vw":320, "h":249.2, "scrollable":false}
```

A 157.5px panel must hold `Counter-clockwise` (17 characters of description) and `Always clockwise`.
The panel is width-anchored to a trigger that R4-1 has just shown is already 30px too narrow for its
own value, so the explanation lane inherits the same under-width. The bar's `grid-cols-2` decision
propagates into the portalled surface it does not own.

### (c) The panel severs a description through its x-height

`listbox-0operands-light.png` at 1440: the panel is 384px for 471.6px of rows, and the cut lands
**inside** the 7th row's description — `Hue-whiteness-blackness` is bisected horizontally through
the letterforms, with a bare chevron below and no fade or gradient mask. r2 counted the scrolled
pixels; the visual fact is that the boundary is a mid-glyph shear rather than a whole-row edge.
`PROPORTION-AUDIT §5.8`: *"Real rendered relation wins over token intent."*

---

## R4-4 · MAJOR · the last operand path is dead — proved by exhaustion, not inferred

r1/r2/r3 established that Colors mode's add-slot is an `aria-hidden` span (glass-ui 7's P051
abrogation of `WatercolorDot tag="button"`, which `VISUAL-CONSTITUTION §4.2` itself mandates)
landing without the *"named enclosing geometric button/seat"* the same law requires. r3's state
table then recorded `≥2 operands` as **reachable — "palettes mode only"**.

That left one path unexamined: `MixSourceSelector.vue:216-221` renders per-palette color swatches
with `:aria-label="`Add color ${color.css} from ${palette.name}`"`, which would add **colors** to
the Colors-mode rack. This round tested it.

Method (`p8.mjs`): `addInitScript` seeds `localStorage["color-palettes"]` with a valid two-palette
store (`Alpha` 3 colors, `Beta` 2 colors, `version: 1`, matching `PaletteStore` in
`demo/palettes/types.ts:138-141`); load `/#/mix`; click `From palettes`; wait 1200ms; enumerate.

```json
{ "count": 6,
  "sample": [ {"tag":"SPAN","aria":null,"hidden":"true","variant":"solid","pe":"none"},
              {"tag":"SPAN","aria":null,"hidden":"true","variant":"ghost","pe":"none"}, … ],
  "buttonsWithAdd": 0,
  "allButtonAria": ["Save edit","Cancel edit","Switch to slug","Generate new slug","Cancel","Back",
    "Reset color","Copy color","Random color","Palettes","Extract palette","Open color input",
    "Select view","Toggle action bar","Menu","Select color space","l channel","a channel",
    "b channel","alpha channel","Color space","Hue method"] }
```

**Twenty-two named buttons on the entire `/#/mix` route; not one of them adds an operand.** Every
swatch is `<span aria-hidden="true">` with `pointer-events: none`. Hit-testing the add ghost at its
own centre (`p6.mjs`) returns the parent `div.swatch-row`, and two `{force: true}` clicks still
leave `{"disabled": true, "opacity": "0.5"}`.

Consequences that were previously inference and are now proof:

1. `useMixingState.ts:42` `selectedColors = ref([])`, no persistence, no URL restore; `:50-51`
   `canMix` needs `>= 2`. **Colors mode can never arm.**
2. `MixPane.vue:100` passes `:operand-colors="mode === 'colors' ? … : []"`. Palettes mode passes
   `[]` unconditionally. Therefore `operandColors` is **empty in every reachable state of the app**,
   and `PreviewRamp` — whose only two consumers are `MixConfigBar.vue:111` and `:133`
   (`grep -rn "PreviewRamp" demo | grep -v color-chips`) — renders **nowhere**. Live confirmation
   with the menu open: `"ramps": 0` across all nine rows.
3. The dead surface is: `PreviewRamp.vue` (50 LOC), the ramp arm of `color-chips/sample.ts`
   (of 91 LOC), and in this 172-line file the import (23), the `operandColors` prop with its 6-line
   JSDoc (38-45), the 10-line T-17 doc block (47-56), both `computed` maps (57-74) and both
   `#description` chip slots (109-114, 131-136).

**The design reading.** The file is scrupulously honest about the *chips* — *"With fewer than 2
operands the rows carry NO chip (honest absence — the preview has nothing true to say; never a
canned swatch)"* (38-43). It is not honest about **itself**: it renders a complete,
full-strength, fully-operable tuning instrument for a mix that cannot happen, with no invitation and
no precondition. r3 put it exactly right — *"the bar's empty state is its populated state"* — and
this round supplies the missing proof that the populated state has no door at all in Colors mode.

---

## R4-5 · MINOR · the dead Button vocabulary is 96 sites, not one

r1 found `variant="primary-audacious"` inert at this call site and read the rendered
`data-emphasis=secondary`. Round 4 measures the blast radius, because the cure's shape depends on it.

Producer contract (`glass-ui/dist/components/button/Button.vue.d.ts`) —
`ButtonProps = { emphasis?: "primary"|"secondary"|"quiet"|"text"; tone?: Tone;
size?: "xs"|"sm"|"md"|"lg"; iconOnly?; loading?; type?; disabled?; class? }`. **No `variant`.**
Producer selector set (`components/button/styles.css`): `.button`,
`[data-emphasis="primary"|"secondary"|"quiet"|"text"]`,
`[data-tone="destructive"|"info"|"neutral"|"success"|"warning"]`.
`grep -rl "audacious" node_modules/@mkbabb/glass-ui/dist/` hits only
`styles/typography/{scale,semantic}.css`, `composables/motion/spring/springPresets.d.ts`,
`components/dock/styles/density.css` — **never a button register.**

Demo census:

```
$ grep -rhn 'variant="[a-z-]*"' demo -r | grep -o 'variant="[a-z-]*"' | sort | uniq -c | sort -rn
  29 outline   28 ghost   7 spectrum   7 secondary   7 error   5 breath   3 shimmer   3 pill
   2 primary-audacious   2 misconfigured   2 developing   1 seated   1 destructive   1 default
```
**96 call sites, 14 distinct values, none of which glass-ui 7 accepts.**

Live cross-component confirmation on one page (`p9.mjs`) — three different components, same result:

| button | source `variant` | rendered |
|---|---|---|
| Mix (this file) | `primary-audacious` | `data-emphasis="secondary" data-tone="neutral" data-size="md"` + inert `variant` attribute |
| Dock `Login` | `outline` | `data-emphasis="secondary" data-tone="neutral" data-size="xs"` + inert `variant` |
| Dock `@mbabb` | `ghost` | `data-emphasis="secondary" data-tone="neutral" data-size="xs"` + inert `variant` |

Everything on the page is `secondary neutral`. That is the mechanical reason the shipped frames read
as one flat register with no hierarchy: **the app has no hierarchy to render.**

Note for accuracy: `SelectTrigger` **does** declare `variant?: "default"|"ghost"`
(`SelectTrigger.vue.d.ts:11`), so the Select side of this file is unaffected. This is Button-only.

**Cure shape (why the census matters).** 96 local edits is the wrong answer. One
`variant → emphasis|tone` crosswalk relayed to the glass-ui BH inbox under the standing relay edict,
plus a `vue-tsc` gate that rejects unknown props on producer components — the current strictness
(`verbatimModuleSyntax`, `strict: true`) did not catch a prop that exists only in the demo's
imagination, because Vue's attribute fallthrough is silent by design.

---

## R4-6 · MINOR · the canon itself is in conflict about `.section-label`, and this component sits on the fault line

r1 and r3 charged the component with a `VISUAL-CONSTITUTION §4` type-matrix violation for the three
`.section-label` captions. The charge is right about the render and **incomplete about ownership**.

- `VISUAL-CONSTITUTION §4`, closed matrix: *control or label, including dropdown options →
  `text-small`, Plus Jakarta Sans, non-bold*; *value, code, or provenance → `text-mono-small`, or the
  already-established `mono-caption` **where the content is a caption***.
- `glass-ui/dist/styles/typography/utilities.css`:
  `.section-label { @apply text-mono-caption; color: var(--muted-foreground); }`, and
  `text-mono-caption` = `font-family: var(--font-mono); font-size: var(--type-caption);
  letter-spacing: var(--type-tracking-caps); text-transform: uppercase`.
- `demo/DESIGN.md:52-58` **blesses exactly this**: *"Use glass-ui's named utilities — … `.section-label`
  — instead of raw `text-2xl`"*, and names the consumers: *"consumed by the gradient / mix / generate
  control bars."*

So the demo's own design document sanctions the register the tranche constitution forbids, and names
this file as an intended consumer. Measured (`p1.mjs`): Fira Code, 14.384px, `letter-spacing
1.4384px`, `text-transform: uppercase`, weight 400 — a mono micro-caps register, in six other demo
files (`GradientVisualizer` ×4, `GenerateControls` ×2, `MixSourceSelector`, `SearchFilterBar` ×4,
`AdminTagsPanel`, `TagEditPopover`).

**Charged to this component: nothing new.** The register is a family and its owner is the canon. One
of the two documents must yield before any wave can close the row, and closing it in
`MixConfigBar.vue` alone would put this file out of step with six siblings.

**What *is* charged locally** — and no canon sanctions it — is the verb's own type. `MixConfigBar.vue:165`
writes `class="h-10 gap-2 font-medium font-display"`; measured, that renders the control label in
**Fraunces at weight 500**. `VISUAL-CONSTITUTION §4` reserves Fraunces for display/identity;
`demo/DESIGN.md:45-48` independently prohibits *"blanket `font-display` on body containers."* Read
with the caption: within one component the **label** speaks the value family (Fira Code), the
**value** speaks the control family (Plus Jakarta Sans 16.4px), and the **verb** speaks the display
family (Fraunces 500). Three roles, three families, each in another's jurisdiction.

---

## R4-7 · INFO · the caption is announced twice, and the verb contains a nameless `img`

ARIA snapshot of the bar (`p5.mjs`, `locator.ariaSnapshot()`):

```
- text: Color space
- combobox "Color space": OKLab
- text: Hue method
- combobox "Hue method": Shorter
- button "Mix" [disabled]:
  - img
  - text: Mix
```

Two distinct facts, neither previously transcribed:

1. **Double announcement.** Because the `<label>`s at `:98,:121,:145` are orphans (`htmlFor: null`,
   no labelable descendant — r1/r2/r3, re-measured this round) they surface as **bare text nodes**,
   and then each trigger's `aria-label` repeats the same string. Linear AT traversal reads
   *"Color space … Color space, combobox, OKLab."* Prior rounds established the orphaning and the
   `Size mismatch` / `Size mismatch strategy` drift; the duplication of the *identical* string is
   the third consequence and it is the one a user hears.
2. **Nameless `img`.** `MixConfigBar.vue:168` is `<Blend class="w-4 h-4" />` with no `aria-hidden`,
   so the decorative glyph enters the accessibility tree as an unnamed `img` inside a named button.
   Its own sibling does it correctly — `MixSourceSelector.vue:173`:
   `<Plus … aria-hidden="true" />`. `PROPORTION-AUDIT §5.5`: *"A small icon/mark is either data,
   status, labeled action, drag affordance, focus/selection register or removed."*
   Explicitly **not** the `namelessButtons: 1` that `REPORT.json` records for `/#/mix` — r2 correctly
   attributed that to `button.send-btn` in an unrelated widget. This is a different node.

---

## R4-8 · INFO · things this round re-measured and confirmed unchanged

Recorded so a fifth round does not re-spend browser time.

| Prior finding | Round-4 status |
|---|---|
| `variant="primary-audacious"` inert; `data-emphasis="secondary"` (r1) | **CONFIRMED**, and quantified (R4-5) |
| Colors-mode add-slot is `aria-hidden` / `pointer-events: none` (r1/r2/r3) | **CONFIRMED** by hit-test, and closed by exhaustion (R4-4) |
| Three orphan `<label>`s; label-click inert (r1/r2/r3) | **CONFIRMED**: `{htmlFor: null, hasControlChild: false}` ×3; clicking `Color space` changes the listbox count `0 → 0` |
| Third control full-width outside the grid (r3 R3-4) | **CONFIRMED**: `gridTemplateColumns: "227px 227px"`, third trigger `w: 462` — exactly 2.03× |
| Mode switch reflows with no transition (r2 D-10) | **CONFIRMED**: bar origin `y 423.16 → 557.30` (+134.14px), height `113.58 → 187.16` (+73.58px), zero transition, in a card whose sibling uses `<Transition name="vj-morph">` (`MixPane.vue:105`) |
| `h-9` ×3 / `h-10` over producer `size` registers (r2/r3) | **CONFIRMED**: triggers 36px, verb 40px at 1440; `SelectTrigger.vue.d.ts:11` `size?: "sm"\|"default"`, `Button.vue.d.ts:5` `size?: "xs"\|"sm"\|"md"\|"lg"` both unused |
| `loading` prop unused during the mix animation (r3 R3-9) | **CONFIRMED**: `Button.vue.d.ts:14` `loading?: boolean` — *"Marks an in-flight command and suppresses activation until it settles"* — absent from the call |
| Disabled verb is removed from tab order (implied by r1's cure) | **CONFIRMED**: `{disabledBtnFocusable: false, tabIndex: 0}` — a keyboard user never reaches the verb and is never told why |
| `opacity: 0.5` survives forced-colors (r2) | **CONFIRMED**: under `forcedColors: "active"` the verb computes `{color: "rgb(96,0,0)", border: "rgb(0,0,0)", opacity: "0.5"}` — the UA supplies GrayText and the component's alpha still rides on top; `bar-forced-colors.png` shows the two selects with crisp 1px black edges beside a faded verb |
| Empty acreage below the bar (r2 D-12, MixPane-owned) | **CONFIRMED**: card `{y: 147.5, h: 684.77}` → bottom 832.27; bar bottom 536.74 → **295.5px = 43.2%** void, against `VISUAL-CONSTITUTION §3.2`'s ≤15% |

---

## What is genuinely sound — negative proof, re-verified this round

| Claim | Evidence |
|---|---|
| **RTL is correct** | `p3.mjs` with `documentElement.dir = "rtl"`: triggers mirror (`Color space` x=459 right, `Hue method` x=224 left), labels `direction: rtl`, `text-align: start`. No bidi damage. |
| **200% zoom is clean** | `p3.mjs` at 720×450 with `documentElement.style.zoom = 2`: triggers 270×72, `trunc: false` on both, `overflowX: 0`. |
| **Reduced motion is respected** | `p3.mjs` with `reducedMotion: "reduce"`: verb `transition-duration` 0.2s → **0.1s**; open listbox `animationDuration: 1e-05s`. |
| **No horizontal overflow at any arm** | measured `overflowX: 0` at 320, 390, 1440 and 200%-zoom (`p2.mjs`, `p3.mjs`); matches `REPORT.md` *"horizontalOverflow — 0"*. |
| **No console or page errors on `/#/mix`** | `REPORT.json`: `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` in all four Safari matrices. |
| **The caption's own contrast passes AA** | 5.05:1 rendered (`p5.mjs`: glyph L 0.095 on ground L 0.6824). The caption defect is jurisdictional (R4-6), not a contrast failure at this ground — r3's peak-ink 4.367/3.681 measured the shipped Safari plate under a different seed; both are true of their own grounds, which is itself r3's R3-2 point about alpha-over-ambient. |
| **The component adds no motion, and forces no layout** | zero keyframes, zero transition classes, zero `--animation-slide-*` in the file. All observed motion is producer-owned: `transition-property: background-color, border-color, box-shadow, color, opacity, scale` — **no layout-forcing property**. No animation was deleted (edict 6). |
| **`verbatimModuleSyntax` clean** | `:12-15` — all four type-only imports use `import type` (edict 8). |
| **Idiomatic Vue 3.5** | reactive props destructure with default at `:25-45`; typed `defineEmits` at `:76-81`; prop-in/emit-out, so no `defineModel` async round-trip and no `shallowRef` obligation (edict 7). |
| **No god module, no legacy shim** | 172 lines, one job; no alias, migration shim, dual path or masking fallback anywhere in the file (edicts 1, 2). |
| **No local design-system fork** | `demo/ui/select/index.ts` and `demo/ui/button/index.ts` are one-line pure re-exports of `@mkbabb/glass-ui`. Edict 4's letter is honoured; its spirit is broken by R4-3/r3-R3-3. |

---

## Canon conformance — round-4 delta only

Prior rounds' tables stand. This round changes three rows and adds one.

| Authority | Clause | Prior status | Round-4 status |
|---|---|---|---|
| `VISUAL-CONSTITUTION §3.2` / §4 | the 320px observation arm renders correctly | **PASS** (r2, r3: "no truncation at any width") | **FAIL** — R4-1, cross-engine, pixel-proved |
| `VISUAL-CONSTITUTION §4.1` | rendered contrast of *text* on the actual material tier | measured for caption + boundaries only | **FAIL extended** — the verb's own word, 3.24 : 1 / 2.77 : 1 (R4-2) |
| `VISUAL-CONSTITUTION §4.2` | exactly one marker agreeing with the selected option; no local pill/halo | argued from the trigger side (r3 R3-3) | **FAIL extended** — two markers for one domain choice, measured from the menu side (R4-3a) |
| `PROPORTION-AUDIT §5.8` | rendered relation wins over token intent | FAIL (r3) | **FAIL reinforced** — the producer's `line-clamp-1` *token* is present and the *rendered* result is a sheared word (R4-1) |
| **Audit-method row (new)** | π/DELTA evidence must measure the node that carries the property | — | **the program's own probes must walk past `overflow: visible` containers**; a `scrollWidth == clientWidth` test on a flex trigger is information-free (R4-1) |

---

## Gestalt — what round 4 adds to the transposition

r1 asked for a labelled-field composition. r2 asked to split the node by job and move the verb into
the chassis action region. r3 asked to stop asserting geometry and let the producer's registers
arrive. All three stand; I adopt them without restating them.

Round 4 adds the observation that ties them together and explains why each prior round found a
*different* root cause and all three were right:

> **Every defect in this component is a boundary the file crosses without looking at what is on the
> other side.** It asserts a height across the producer's padding (r3). It asserts a variant across
> an API that no longer has one (r1). It asserts a two-column grid across a value vocabulary it
> never measured (R4-1). It asserts a preview across an operand supply that has no door (R4-4). It
> asserts a caption across a type jurisdiction that two documents disagree about (R4-6). The file is
> not badly designed *internally* — its 172 lines are clean, typed, idiomatic and comment-rich. It
> is designed **without contact**: every one of its decisions is locally reasonable and none of them
> was checked against the thing it lands on.

The methodological corollary, which is this round's most durable output: **the audit had the same
disease.** Three rounds certified "no truncation" because the probe stopped at the node whose name
matched the concept rather than the node that carried the property. A component that never checks
its boundaries was audited by probes that never checked theirs.

Ordering, folding into r3's:

0. **Re-open the truncation row** (R4-1) — it is currently recorded as proved-clean in two prior
   rounds. `grid-cols-1 sm:grid-cols-2` in this file; `text-overflow: ellipsis` on the producer's
   value span via the BH relay.
1. r3's step 1 — delete every hard-coded dimension. This subsumes half of step 0's local arm.
2. r3's steps 2–4 — one color-space species (now also one *marker*, R4-3a), one field shape, `mode`
   instead of `showLeftoverStrategy`.
3. r2's split — the verb moves to the chassis action region, taking `emphasis`, `tone`, `loading`
   and its precondition reason with it. Its contrast (R4-2) and its tab-order absence are both
   solved there, by the producer, once.
4. Restore a real operand seat in `MixSourceSelector` (R4-4) — `VISUAL-CONSTITUTION §4.2` already
   prescribes the shape: *"Selection, activation, drag and keyboard focus belong to a named
   enclosing geometric button/seat."* Until that lands, every enabled-state design in this bar is
   unobservable and any wave claiming to have fixed it cannot show a frame.

## Disposition

`REMOVE` the dead variant vocabulary and the unreachable chip apparatus; `ADD-AFFORDANCE` for the
empty, blocked and in-flight states; `TIGHTEN` the grid against its own vocabulary, the type
jurisdiction and the seat/optics separation. **No source edits land from this formation.** The
Button `variant → emphasis|tone` crosswalk, the `SelectItem` marker law, the value-span
`text-overflow`, and the `WatercolorDot` seat regression are all **glass-ui BH/BI relay** items under
the standing relay edict — not local patches.
